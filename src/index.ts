import "reflect-metadata";
import Express from "express";

import "./database";


const app = Express();


app.listen(3000, () => console.log("🔥 Server started at http://localhost:3000"));