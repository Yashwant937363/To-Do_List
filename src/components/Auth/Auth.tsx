import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Cookies from "js-cookie";
import { getUser, setAuthToken } from "../../store/slices/userSlice";
import HomeSkeleton from "./HomeSkeleton";

const Auth = () => {
  const navigate = useNavigate();
  const { isLogin } = useAppSelector((state) => state.user);
  const isPendingUser = useAppSelector((state) => state.user.isPending);
  const isPendingNote = useAppSelector((state) => state.notes.isPending);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);
  useEffect(() => {
    const token = Cookies.get("authtoken");
    if (token !== undefined) {
      dispatch(setAuthToken(token));
      dispatch(getUser({ token, dispatch }));
    }
  }, []);

  if (isPendingNote || isPendingUser) return <HomeSkeleton />;

  return <Outlet />;
};

export default Auth;
