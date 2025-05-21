import config from "config"
import express from "express";
import { mainRouter } from "./routes/main.routes.js";


const app = express();
app.use(express.json());

let PORT = config.get("PORT") || 3000;

app.use("/api", mainRouter)


app.listen(PORT, () => console.log(`Server is running on port -> http://localhost:${PORT}`));
