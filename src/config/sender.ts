import {createTransport} from "nodemailer";
import {env} from "./env.ts";

export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,              
    secure: true,         
    auth: {
        user: env.EMAIL,
        pass: env.PASSWORD
    }
});