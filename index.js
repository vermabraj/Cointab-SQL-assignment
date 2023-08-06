const express = require("express");
const db = require("./models");

const { userRouter } = require("./Routes/userRoute");

const app = express();
app.use(express.json());
app.use("/", userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, async () => {
    console.log("Connected to database");
  });
});
