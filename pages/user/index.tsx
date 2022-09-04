import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FullLoading from "../../components/FullLoading";
import { userContext } from "../../context/User";

function Dashboard() {
  const { userData, setUserData } = useContext(userContext);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setReady(true);
    if (!ready) return;
    if (!userData.isLoggedIn) router.push("/auth");
  }, [userData.isLoggedIn, ready]);
  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    setUserData({ email: "", isLoggedIn: false });
    router.push("/auth");
  };

  if (ready && userData.isLoggedIn) {
    return (
      <div className="container py-2">
        <button onClick={logOut}>لاگ اوت</button>
      </div>
    );
  } else {
    return <FullLoading />;
  }
}

export default Dashboard;
