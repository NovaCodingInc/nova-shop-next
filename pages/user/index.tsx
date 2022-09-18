import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { resetBasket } from "../../app/features/basketSlice";
import { resetUserInfo } from "../../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FullLoading from "../../components/FullLoading";

function Dashboard() {
  const router = useRouter();
  const {
    isLoggedIn,
    email,
    loading: loadingUserInfo,
  } = useAppSelector((state) => state.user);
  useEffect(() => {
    !isLoggedIn && router.push("/auth");
  }, [isLoggedIn]);
  const dispatch = useAppDispatch();
  const logOut = () => {
    Cookies.remove("token");
    dispatch(resetUserInfo());
    dispatch(resetBasket());
    router.push("/auth");
  };

  return (
    <div className="container py-2">
      سلام {email}
      <button style={{ backgroundColor: "red" }} onClick={logOut}>
        لاگ اوت
      </button>
    </div>
  );
}

export default Dashboard;
