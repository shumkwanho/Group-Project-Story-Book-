import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import { router } from "./router";
import loginRoute from './routes/loginRoute';
import userRoute from './routes/userRoute';
import { registerRoute } from './routes/registerRoute';
import path from 'path';

const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use('/api', registerRoute);
app.use("/",router);


app.use("/login", express.static("public/login"))
app.use(express.static("public"));
app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});