import Swal from "sweetalert2";
import repoApi from "../api/repoApi";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { onChecking, onLogin, onLogout } from "../store";

interface UserLogin {
  user: string;
  password: string;
}

export const useAuthStore = () => {
  const { status, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const startLogin = async ({ user, password }: UserLogin) => {
    dispatch(onChecking());

    const params = {
      user: user,
      password: password,
    };

    try {
      const { data } = await repoApi.get("login", { params });

      if (data.length === 0) {
        Swal.fire({
          title: "Error",
          text: "User not found",
          icon: "question",
        });

        dispatch(onLogout());
      } else {
        localStorage.setItem("id", data[0].id);
        localStorage.setItem("user_id", data[0].user_id);
        localStorage.setItem("user", data[0].user);

        dispatch(
          onLogin({
            id: data[0].id,
            user_id: data[0].user_id,
            user: data[0].user,
          })
        );
      }
    } catch (error) {
      console.log("error start login >>> ", error);

      dispatch(onLogout());

      Swal.fire({
        title: "Error",
        text: "Error connecting to database",
        icon: "error",
      });
    }
  };

  const startCheckAuth = () => {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      dispatch(onLogout());
    } else {
      
      const id = localStorage.getItem("id");
      const user_id = localStorage.getItem("user_id");
      const user = localStorage.getItem("user");

      dispatch(
        onLogin({ id: Number(id), user_id: Number(user_id), user: user! })
      );
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,

    startLogin,
    startCheckAuth,
    startLogout,
  };
};
