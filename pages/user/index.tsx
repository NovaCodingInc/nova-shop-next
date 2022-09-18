import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { resetBasket } from "../../app/features/basketSlice";
import { resetUserInfo } from "../../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../../styles/components/user/user.module.scss";

function Dashboard() {
  const router = useRouter();
  const { isLoggedIn, email } = useAppSelector((state) => state.user);
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
      <div className={styles.wrapper}>
        <div className={styles.greeting}>
          <p>
            سلام <span>{email}</span> خوش آمدید
          </p>
          <div className={styles.icon}>
            <Image
              src={"/images/userIcon.png"}
              width={130}
              height={130}
              alt="user icon"
            />
          </div>
        </div>
        <div className={styles.logout}>
          <button onClick={logOut}>خروج از حساب</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
