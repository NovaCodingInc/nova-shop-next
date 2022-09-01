import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { basketContext } from "../../context/Basket";
import { userContext } from "../../context/User";
import styles from "../../styles/components/singleProduct/singleProductPage.module.scss";

function Order({ payload }: any) {
  const [count, setCount] = useState(1);
  const { query } = useRouter();

  useEffect(() => {
    setCount(1);
  }, [query.id]);
  const { dispatch, basketData } = useContext(basketContext);
  const { userData, setUserData } = useContext(userContext);
  const addToBasket = () => {
    if (!userData.isLoggedIn) {
      if (basketData.filter((item: any) => item.id === payload.id).length < 1) {
        dispatch({ type: "ADD", payload: { ...payload, count } });
        const newArr = [...basketData, { ...payload, count }];
        localStorage.setItem("basket", JSON.stringify(newArr));
      } else {
        dispatch({ type: "UPDATE", payload: { id: payload.id, count } });
        const newArr = basketData.map((item: any) => {
          if (item.id === payload.id) {
            return { ...item, count };
          } else {
            return item;
          }
        });
        localStorage.setItem("basket", JSON.stringify(newArr));
      }
    } else {
      if (basketData.filter((item: any) => item.id === payload.id).length < 1) {
        dispatch({ type: "ADD", payload: { ...payload, count } });

        (async () => {
          const x = axios.post(`http://localhost:3001/basket`, {
            ...payload,
            count,
          });
          console.log(x);
        })();
      } else {
        // soon
      }
    }
  };
  return (
    <>
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
        <button onClick={addToBasket}>افزودن به سبد خرید</button>
      </div>
    </>
  );
}

export default Order;
