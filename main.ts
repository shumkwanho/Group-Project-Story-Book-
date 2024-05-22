import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import { router } from "./router";
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


app.use('/test', express.static("public/testingPage"));

app.get('/', function(req, res){
    res.sendFile('login.html', { root: __dirname + "/public/html/" } );
});



app.use("/",router)

app.use(express.static("public"));
app.use((req: Request, res: Response) => {
    res.status(404).json({ "Message": "404 NOT FOUND" })
})
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});