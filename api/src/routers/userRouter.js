import express from "express";
import { getOneUser, insertUser } from "../models/userModel/UserModel.js";
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getOneUser({ email });

    if (user?.password === password) {
      user.password = undefined;
      return res.json({
        status: "success",
        message: "Login successfully",
        user,
      });
    }
    res.json({
      status: "error",
      message: "Invalid Login information",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message:
            "Your account has been created successfully, Please go to login page and login with your email: " +
            result.email,
        })
      : res.json({
          status: "error",
          message: "Unable to register, please try again lager",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "There is another user already exist with this email";
    }
    next(error);
  }
});

export default router;
