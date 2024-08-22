import { Router } from "express";
import { createLocation, getAllLocations, deleteLocationById } from "../controllers/locations.controller.js";

const locationsRouter = Router();

locationsRouter.post("/locations", createLocation);
locationsRouter.get("/locations", getAllLocations);
locationsRouter.delete("/locations/:id", deleteLocationById);

export default locationsRouter;