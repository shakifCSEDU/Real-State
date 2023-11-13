const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require('./routes/user.route.js');
const authRouter = require("./routes/auth.route.js");
app.use(express.json());
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


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
