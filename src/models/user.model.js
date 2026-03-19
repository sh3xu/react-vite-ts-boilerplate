const mongoose = require("mongoose");
const argon2 = require("argon2");
const validator = require("validator");
const { paginate, toJSON } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error("Password must contain at least one letter and one number");
        }
      },
      private: true, // used by the toJSON plugin
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      // required: true,
      // match: [/^\+(\d{1,4})\d{4,10}$/, 'Please enter a valid phone number'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        if (ret.image === null || ret.image === undefined) {
          delete ret.image;
        }
        return ret;
      },
    },
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
/**
 * Check if email is taken (excluding empty emails)
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  if (!email) {
    return false;
  }
  const user = await this.findOne({
    $and: [{ email }, { email: { $nin: [null, ""] } }, { _id: { $ne: excludeUserId } }],
  });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return argon2.verify(this.password, password);
};

userSchema.pre("save", async function () {
  // If email is provided, check if it's valid
  // if (this.email && !validator.isEmail(this.email)) {
  //   return next(new Error('Invalid email format.'));
  // }

  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password, { type: argon2.argon2id });
  }
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = { User };
