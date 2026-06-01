import dotenv from "dotenv"
import express from "express"
import { rootRouter } from "./src/routers/root.router.js"
const app = express()

app.use(express.json())//middleware để parse body của request có định dạng json thành object

const port = 3069

app.use("/api",rootRouter)

app.listen(port,()=>{
    console.log("Server online at port:"+port)
})