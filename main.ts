import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import { router } from "./router";
import loginRoute from './loginRoute';
import userRoute from './userRoute';

const app = express();
const PORT = 8080;

app.use(
    expressSession({
        secret: "Tecky Academy teaches typescript",
        resave: true,
        saveUninitialized: true,
    })
);

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

app.use("/login", express.static("public/login"))

app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use("/",router)

app.use(express.static("public"));
app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});