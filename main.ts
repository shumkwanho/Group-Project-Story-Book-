import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import { router } from "./router";
import loginRoute from './routes/loginRoute';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import path from 'path';

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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', loginRoute);
app.use('/user', userRoute);
app.use("/",router);


app.use("/login", express.static("public/login"))
app.use("/test", express.static("public/testingPage"))

app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use("/",router)

app.use(express.static("public/mainpage"));
app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})

app.get('/text.html', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'text.html'));
  });

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});