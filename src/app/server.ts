
import express from "express";
import { AppRouter } from "./routes.ts";
import cors from "cors";
import { handleResponse } from "../middlewares/handleResponse.ts";
import { join } from "path";
const app = express()
app.use(cors({
    origin: "*",
  credentials: true
}))
const outputDir = join(process.cwd(), "src", "media");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/media', express.static(outputDir));
app.use(AppRouter);
app.use(handleResponse);

const HOST = "0.0.0.0"
const PORT = 8000

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})