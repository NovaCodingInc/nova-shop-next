import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { basketContext } from "../context/Basket";
import { userContext } from "../context/User";

function InitData() {
  const { dispatch } = useContext(basketContext);
  const { userData, setUserData } = useContext(userContext);
  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("email");
    if (token && email) {
      setUserData({ email: email, isLoggedIn: true });
    } else {
      setUserData({ email: "", isLoggedIn: false });
    }

    // if (!userData.isLoggedIn) {
    //   const payload = JSON.parse(localStorage.getItem("basket") || "[]");

    //   dispatch({ type: "ADD_ALL", payload });
    // } else {
    //   (async () => {
    //     const { data: payload } = await axios.get(
    //       `http://localhost:3001/basket`
    //     );
    //     dispatch({ type: "ADD_ALL", payload });
    //   })();
    // }
  }, []);

  return null;
}

export default InitData;
