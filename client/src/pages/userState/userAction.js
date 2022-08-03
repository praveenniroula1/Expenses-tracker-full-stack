import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../helpers/axiosHelper";
import { setUser } from "./userSlice";

export const loginAction = (obj) => async (dispatch) => {
  // call axios
  const { status, message, user } = await loginUser(obj);
  toast[status](message);

  if (status === "success") {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
  }
};
export const userLogOutAction = () => (dispatch) => {
  dispatch(setUser({}));
  window.sessionStorage.removeItem("user");
};
