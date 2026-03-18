const mongoose = require("mongoose");
const argon2 = require("argon2");
const { User } = require("../../src/models/user.model");

const randomString = () => Math.random().toString(36).slice(2);
const randomName = () => `User ${randomString()}`;
const randomEmail = () => `user.${randomString()}@example.com`;

const password = "password1";

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  name: randomName(),
  email: randomEmail(),
  password,
  role: "user",
  isEmailVerified: false,
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: randomName(),
  email: randomEmail(),
  password,
  role: "user",
  isEmailVerified: false,
};

const admin = {
  _id: new mongoose.Types.ObjectId(),
  name: randomName(),
  email: randomEmail(),
  password,
  role: "admin",
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
