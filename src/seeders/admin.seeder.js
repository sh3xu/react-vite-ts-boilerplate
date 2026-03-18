const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../config/logger");
const { User } = require("../models/user.model");

async function seedAdmin() {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);

  const email = "adminn@yopmail.com";
  const password = "Test@123";

  const existing = await User.findOne({ email });
  if (existing) {
    logger.info({ email, userId: existing._id.toString() }, "Admin user already exists");
    return;
  }

  const user = await User.create({
    name: "Admin",
    email,
    password,
    role: "admin",
    isEmailVerified: true,
  });

  logger.info({ email, userId: user._id.toString() }, "Admin user created");
}

seedAdmin()
  .then(() => mongoose.connection.close())
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error({ err }, "Admin seed failed");
    mongoose.connection.close().finally(() => process.exit(1));
  });
