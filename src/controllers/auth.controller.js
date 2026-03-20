const httpStatus = require("http-status");
const config = require("../config/config");
const moment = require("moment");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService, emailService } = require("../services");
const { getUserById, checkOtp } = require("../services/user.service");
const { tokenTypes } = require("../config/tokens");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password, User);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens, message: "Logged in Successfully" });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email, User);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken.resetPasswordToken);
  const emailToken = jwt.sign({ email: req.body.email }, config.jwt.secret, {
    expiresIn: `${config.jwt.resetPasswordExpirationMinutes}m`,
  });
  res.status(httpStatus.OK).send({
    success: true,
    data: {
      emailToken,
      message: "OTP sent",
    },
  });
});

const resendOtp = catchAsync(async (req, res) => {
  const { emailToken } = req.body;
  if (!emailToken) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  const decoded = jwt.verify(emailToken, config.jwt.secret);
  const resetPasswordToken = await tokenService.generateResetPasswordToken(decoded.email, User);

  await emailService.sendResetPasswordEmail(decoded.email, resetPasswordToken.resetPasswordToken);

  res.status(200).send({ success: true, message: "Otp Sent" });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { otp, emailToken } = req.body;
  const decoded = jwt.verify(emailToken, config.jwt.secret);
  const user = await userService.getUserByEmail(decoded.email, User);
  if (!user) {
    throw new Error();
  }
  await checkOtp(user._id, otp, User);
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, "minutes");
  const resetToken = tokenService.generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await tokenService.saveToken(resetToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  res.status(200).send({ success: true, resetToken, message: "OTP verified successfully" });
});

const resetPassword = catchAsync(async (req, res) => {
  const data = await authService.resetPassword(req.query.token, req.body.password, User);
  if (data?.message) return res.status(httpStatus.BAD_REQUEST).send({ message: data.message });
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token, User);
  res.status(httpStatus.NO_CONTENT).send();
});
const authMe = catchAsync(async (req, res) => {
  const data = await getUserById(req.user.id, User);
  res.send({ data: data });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  verifyOtp,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  authMe,
  resendOtp,
};
