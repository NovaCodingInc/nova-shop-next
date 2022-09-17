import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addToBasket, setTotalPrice } from "../../app/features/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../../styles/components/singleProduct/singleProductPage.module.scss";
import axios from "../../context/customAxios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { updatedPrice } from "../authorize";
type addtoBasketType = {
  catalogItemId: number;
  catalogItemName: string;
  pictureUri: string;
  price: number;
  totalPrice: number;
};
type propType = { payload: addtoBasketType };
function Order({ payload }: propType) {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const basket = useAppSelector((state) => state.basket.items);
  const { query } = useRouter();

  useEffect(() => {
    const basketItem = basket.filter(
      (item) => item.catalogItemId === payload.catalogItemId
    )[0];
    if (basketItem) setCount(basketItem.count);
    else setCount(1);
  }, [query.id, basket]);

  const addToBasketHandler = async () => {
    if (!user.isLoggedIn) {
      toast.info("ابتدا وارد حساب کاربری خود شوید");
    } else {
      const response = await axios.post(
        "/basket",
        {
          catalogItemId: payload.catalogItemId,
          count,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(addToBasket({ ...payload, count }));
        const totalPrice = await updatedPrice();
        if (totalPrice !== false) {
          dispatch(setTotalPrice(totalPrice));
        }
        toast.success("محصول به سبد خرید اضافه شد");
      } else {
        toast.error("خطایی پیش آمد");
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.counter}>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          disabled={count >= 9}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <span>{count}</span>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count <= 1}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
      </div>
      <div className={styles.btn}>
        <button onClick={addToBasketHandler}>افزودن به سبد خرید</button>
      </div>
    </>
  );
}

export default Order;
