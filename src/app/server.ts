import express from "express";
import { AppRouter } from "./routes.ts";
import cors from "cors";
import { handleResponse } from "../middlewares/handleResponse.ts";
import { bigIntMiddleware } from "../middlewares/bigIntMiddleare.ts";
import { join } from "path";
import { startTunnel } from "../config/db.tunnel.ts";
import { createServer } from "http";
import { SocketManager } from "../modules/Socket/socket.manager.ts";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.ts";
const app = express();
const httpServer = createServer(app);
SocketManager.initSocketServer(httpServer);
app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

const outputDir = join(process.cwd(), "src", "media");
const date = new Date();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/media/", express.static(outputDir));
app.use(AppRouter);
app.use(bigIntMiddleware);
app.use(handleResponse);

const HOST = "0.0.0.0";
const PORT = 8000;

async function bootstrap() {
	try {
		cloudinary.config({
			cloud_name: env.CLOUDINARY_CLOUD_NAME,
			api_key: env.CLOUDINARY_API_KEY,
			api_secret: env.CLOUDINARY_API_SECRET,
		});
		await startTunnel();
		httpServer.listen(PORT, HOST, () => {
			console.log(`Web socket server ws://${HOST}:${PORT}`);
			console.log(`http://${HOST}:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}
bootstrap();
