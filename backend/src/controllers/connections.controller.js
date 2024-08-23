import { prisma } from "../utils/prismaClient.js";


export const getAllConnections = async(req, res) => {
    try {

        const connections = await prisma.connection.findMany({
            include: {
                location1Relation: true,
                location2Relation: true
            }
        });
        
        const connectionsResult = [];

        connections.forEach(connection => {
            const { location1, location2,  ...updatedConnection } = connection
            connectionsResult.push(updatedConnection);
        });

        res.status(200).json({
            message: "Conexiones obtenidas exitosamente.",
            // data: connectionsResult
            data: connections
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las conexiones.",
            error: error.message,
        });
    }
}

export const createConnection = async(req, res) => {

    const { location1, location2, price } = req.body;

    try {

        const foundLocation1 = await prisma.location.findFirst({ where: { id: location1 } });
        const foundLocation2 = await prisma.location.findFirst({ where: { id: location2 } });
        
        if (!foundLocation1 || !foundLocation2) return res.status(400).json({ message: "Aegurate que ambas ubicaciones existan." });

        if(foundLocation1.id === foundLocation2.id) return res.status(400).json({ message: "Las dos ubicaciones no pueden ser iguales." });

        const createdConnection = await prisma.connection.create({
            data: { location1, location2, price }
        });

        res.status(201).json({
            message: "Conexion creada correctamente.",
            data: createdConnection
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la conexion.",
            error: error.message,
        });
    }
}

export const deleteConnectionById = async(req, res) => {

    const { id } = req.params;

    try {
        
        const foundConnection = await prisma.connection.findFirst({ where: { id: parseInt(id) } });
        if(!foundConnection) return res.status(404).json({ message: `La conexion co id '${id}' no existe.` });

        const deletedConnection = await prisma.connection.delete({ where: { id: parseInt(id) } });

        res.status(200).json({
            message: `Conexion con id '${id}' fue eliminado exitosamente.`,
            data: deletedConnection
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la conexion.",
            error: error.message,
        });
    }
}
