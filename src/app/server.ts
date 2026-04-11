
import express from "express";
import { AppRouter } from "./routes.ts";
import cors from "cors";
const app = express()
app.use(cors({
    origin: "*",
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(AppRouter);


const HOST = "0.0.0.0"
const PORT = 8000

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})