
import express from "express";
import { AppRouter } from "./routes.ts";
import cors from "cors";
const app = express()
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(AppRouter);


const HOST = "127.0.0.1"
const PORT = 8000

app.listen(PORT,HOST, () =>{ 
    console.log(`http://${HOST}:${PORT}`)
})