import { prisma } from "../utils/prismaClient.js";

export const createLocation = async(req, res) => {
    
    const { body } = req;

    try {

        const createdLocation = await prisma.location.create({
            data: body
        });

        res.status(201).json({
            message: "Ubicacion creada con exito.",
            data: createdLocation
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la ubicacion.",
            error: error.message
        })
    }
}

export const getAllLocations = async(req, res) => {
    try {

        const locations = await prisma.location.findMany();

        res.status(200).json({
            message: "Ubicaciones obtenidas correctamente.",
            data: locations
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las ubicaciones.",
            error: error.message
        })
    }
}

export const deleteLocationById = async(req, res) => {

    const { id } = req.params;

    try {

        const foundLocation = await prisma.location.findFirst({ where: { id: parseInt(id) } });
        if(!foundLocation) return res.status(404).json({ message: `La ubicacion con id '${id}' no existe.`});

        const deletedLocation = await prisma.location.delete({ where: { id: parseInt(id) } });

        res.status(200).json({
            message: `Ubicacion con id '${id}' fue eliminada correctamente.`,
            data: deletedLocation
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las ubicaciones.",
            error: error.message
        })
    }
}