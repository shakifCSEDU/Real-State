const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require('./routes/user.route.js');
const authRouter = require("./routes/auth.route.js");
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
