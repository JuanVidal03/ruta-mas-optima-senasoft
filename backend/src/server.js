import express from "express";
import { config } from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";


config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser());
app.use(morgan("dev"));

import authRoutes from "./routes/auth.routes.js";
import locationsRouter from "./routes/locations.routes.js";
import connectionsRouter from "./routes/connections.routes.js";

app.use("/api", authRoutes);
app.use("/api", locationsRouter);
app.use("/api", connectionsRouter);

const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${server.address().port}`));