import Cookies from "js-cookie";
import axios from "../context/customAxios";

export const authorize = async () => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.post(
        "auth/check",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.succeeded) {
        return {
          email: response.data.email,
        };
      } else return false;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
