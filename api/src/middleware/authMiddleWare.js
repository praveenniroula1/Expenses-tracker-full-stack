import { getOneUser } from "../models/userModel/UserModel.js";

export const authMiddleWare = async (req, res, next) => {
  try {
    // do autherization header available
    const { authorization } = req.headers;
    if (authorization) {
      const user = await getOneUser({ _id: authorization });
      if (user?._id) {
        req.userInfo = user;
        return next();
      }
    }
    // do user exist in the db
    res.status(403).json({
      status: "error",
      message: "unthorised",
    });
  } catch (error) {
    next(error);
  }
};
