import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../utils/prismaClient.js";

export const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const userFound = await prisma.user.findFirst({
            where: { email }
        })
        if(!userFound) return res.status(404).json({ message: `El usuario ${email} no existe.` });
        
        const comparePassword = await bcrypt.compare(password, userFound.password);
        if(comparePassword === false) return res.status(400).json({ message: "Contraseña o email incorrectos." });
        
        const user = {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            direccion: userFound.direccion,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        }

        jwt.sign(
            { id: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" },
            (error, token) => {
                error && res.status(400).json({ message: "Error al generar el token.", error });
                res.cookie("token", token, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none"
                });
                return res.status(200).json({
                    message: "Ingreso correctamente.",
                    token: token,
                    data: user,
                });
            }
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al ingresar a la aplicacion",
            error: error.message
        });
    }

}

export const register = async(req, res) => {
    
    const { name, email, password, direccion } = req.body;
    
    try {

        const foundUser = await prisma.user.findFirst({
            where: { email: email }
        });
        if(foundUser) return res.status(400).json({ message: `El usuario con email: ${email} ya existe.` });

        const user = { name, email, password, direccion };

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        const createdUser = await prisma.user.create({
            data: user
        });

        const result = {
            name: createdUser.name,
            email: createdUser.email,
            direccion: createdUser.direccion,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        };

        res.status(201).json({ message: "Usuario registrado exitosamente.", data: result });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al registrar el usuarios",
            error: error.message
        });
    }
}

export const veriFyToken = async(req, res) => {

    const { token } = req.cookies;

    try {

        if(!token) return res.status(403).json({ message: "Sin autorizacion." });

        jwt.verify(token, process.env.TOKEN_SECRET, async(error, user) => {
            if(error) return res.status(400).json({ message: error.message });

            const userFound = await prisma.user.findFirst({ where: { id: user.id } });
            if(!userFound) return res.status(404).json({ message: `Usuario con id: ${user.is} no existe.` });

            return res.status(200).json({
                message: "Token verificado exitosamente.",
                data: user
            });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al verificar el token.",
            error: error.message
        });
    }
}

export const logout = async(req, res) => {
    try {

        res.cookie("token", "", {
            expires: new Date(0)
        });
        
        res.status(200).json({ message: "Sesion cerrada exitosamente." });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al salir de la aplicacion.",
            error: error.message
        });
    }
}