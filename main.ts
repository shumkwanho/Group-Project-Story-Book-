import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
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
        username?: string;
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));
app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});