const express = require("express");
const router = require("./Routes/index");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.listen(process.env.PORT, ()=>{
    console.log("server is live")
})