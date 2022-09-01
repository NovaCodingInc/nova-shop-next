import axios from "axios";
import { useContext, useEffect } from "react";
import { basketContext } from "../context/Basket";
import { userContext } from "../context/User";

function InitData() {
  const { dispatch } = useContext(basketContext);
  const { userData } = useContext(userContext);
  useEffect(() => {
    console.log(userData.isLoggedIn);
    
    if (!userData.isLoggedIn) {
      const payload = JSON.parse(localStorage.getItem("basket") || "[]");

      dispatch({ type: "ADD_ALL", payload });
    } else {
      (async () => {
        const { data: payload } = await axios.get(
          `http://localhost:3001/basket`
        );
        dispatch({ type: "ADD_ALL", payload });
      })();
    }
  }, []);

  return null;
}

export default InitData;
