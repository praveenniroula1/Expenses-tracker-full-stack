import express from "express";
import {
  addTransaction,
  deleteTranasctions,
  getTranasctions,
} from "../models/transaction/TransactionMode.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    const result = await addTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction, try again later",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    const filter = {
      userId: authorization,
    };
    const trans = await getTranasctions(filter);
    res.json({
      status: "success",
      message: "here are the transactions",
      trans,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;
    if (authorization && _id) {
      const filter = {
        userId: authorization,
        _id,
      };
      const result = await deleteTranasctions(filter);

      if (result._id) {
        return res.json({
          status: "success",
          message: "The transaction has been deleted",
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid request",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
