const express = require("express");
const userRouter = express.Router();

const { users } = require("../models");
const { Op } = require("sequelize");

// Fetch route

userRouter.get("/users", async (req, res) => {
  // try {
  //   const data = await users.findAll();
  //   res.status(200).json({ isError: false, data });
  // } catch (error) {
  //   console.log("error while getting user");
  //    res.status(400).json({ isError: true,error });
  // }
  const { limit, offset, sort, order, name } = req.query;
  const options = {
    where: {},
    order: [[sort || "name", order || "ASC"]],
    offset: offset ? parseInt(offset, 10) : 0,
    limit: limit ? parseInt(limit, 3) : 3,
  };

  if (name) {
    options.where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  const Users = await users.findAll(options);
  res.send(Users);
});

// create users

userRouter.post("/users/create", async (req, res) => {
  let { name, age, gender, email, location, city } = req.body;
  try {
    const userCreated = await users.create({
      name,
      age,
      gender,
      email,
      location,
      city,
    });
    res.send({ userCreated });
  } catch (error) {
    console.log("error while getting user");
    console.log(error);
    res.send("error while logged in", error.message);
  }
});

// delete user
userRouter.delete("/users/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    sequelize.sync();
    const user = await users.delete({ where: { id } });
    res.send({ message: "user deleted" });
  } catch (error) {
    console.log("error while deleting user");
    console.log(error);
    res.send("error", error.message);
  }
});

module.exports = {
  userRouter,
};
