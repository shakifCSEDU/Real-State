const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require('./routes/user.route.js');
const authRouter = require("./routes/auth.route.js");

const listingRouter = require('./routes/listing.route.js');

const cookieParser = require('cookie-parser');
const path = require('path');


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

  const _dirname = path.resolve();




app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(_dirname,'/client/dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(_dirname,'client','dist','index.html'));
})


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
