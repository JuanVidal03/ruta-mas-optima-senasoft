import { Router } from "express";
import { getAllConnections, createConnection, deleteConnectionById } from "../controllers/connections.controller.js";

const connectionsRouter = Router();

connectionsRouter.get("/connections", getAllConnections);
connectionsRouter.post("/connections", createConnection);
connectionsRouter.delete("/connections/:id", deleteConnectionById);

export default connectionsRouter