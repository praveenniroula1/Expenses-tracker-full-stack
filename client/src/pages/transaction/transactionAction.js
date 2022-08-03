import { toast } from "react-toastify";
import {
  deleteTranasction,
  getTranasction,
  postTranasction,
} from "../../helpers/axiosHelper";
import { setTransactions } from "./transactionSlice";

export const fetchDataAction = () => async (dispatch) => {
  const { status, message, trans } = await getTranasction();
  console.log(status, trans);

  status === "success" && dispatch(setTransactions(trans));
};
export const postDataAction = (form) => async (dispatch) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user._id;
  const { status, message } = await postTranasction({ ...form, userId });
  toast[status](message);

  status === "success" && dispatch(fetchDataAction());
};
export const HandleOnDeleteActioned = (_id) => async (dispatch) => {
  if (!window.confirm("Are you sure you want to delete the transactions?")) {
    return;
  }
  const { status, message } = await deleteTranasction(_id);
  console.log(status, message);
  toast[status](message);
  status === "success" && dispatch(fetchDataAction());
};
