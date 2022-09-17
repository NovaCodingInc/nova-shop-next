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
          token,
        };
      } else return false;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const getCustomerBasket = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get("/basket", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const priceArr = response.data.items.map((item: any) => {
        return item.totalPrice;
      });
      const total = priceArr.reduce((a: number, b: number) => a + b, 0);

      return {
        items: response.data.items,
        totalPrice: total,
      };
    }
    return false;
  } catch {
    return false;
  }
};

export const updatedPrice = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get("/basket", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const priceArr = response.data.items.map((item: any) => {
        return item.totalPrice;
      });
      const total = priceArr.reduce((a: number, b: number) => a + b, 0);

      return total;
    }
    return false;
  } catch {
    return false;
  }
};
