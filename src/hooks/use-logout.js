import { useDispatch } from "react-redux";
import { logout } from "../actions";

export const useLogout = () => {
    const dispatch = useDispatch();

    return () => {
        dispatch(logout());
        sessionStorage.removeItem("userData");
    };
};
