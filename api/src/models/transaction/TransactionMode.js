import TransactionSchema from "./TransactionSchema.js";

export const addTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

export const getTranasctions = (filter) => {
  return TransactionSchema.find(filter);
};

export const deleteTranasctions = (filter) => {
  return TransactionSchema.findOneAndDelete(filter);
};
