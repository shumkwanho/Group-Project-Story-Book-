import express from "express";
import dotenv from "dotenv";
import path from 'path';
import expressSession from "express-session";
import { Request, Response } from "express";
import { router } from "./router";
import { error } from "console";

const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

dotenv.config();

if (!process.env.SECRET) {
  throw error("SECRET missing in .env");
}

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

app.use("/test",express.static("public/testingPage"))

//TODO: need to set middle guard
app.use("/private", express.static("private"))

app.use("/uploads", express.static("uploads"))
app.use("/",router);
app.use("/", express.static("public/main"));
app.use(express.static("public"));

app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});