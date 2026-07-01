import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { rootRouter } from "./src/routers/root.router.js"
import { PORT } from "./src/common/constant/app.constant.js"
const app = express()

app.use(express.json())//middleware để parse body của request có định dạng json thành object

// const port = 3069

//trả thông tin khi vào url gốc của deploy
app.get("/",(req,res) =>{
    res.status(200).json({
        success:true,
        message:"Bài tập Capstone Nguyễn Minh Tài is running",
        api:"/api"
    })
})

app.use("/api",rootRouter)

//middleware bắt lỗi 
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    });
});

app.listen(PORT,()=>{
    console.log("Server online at port:"+PORT)
})