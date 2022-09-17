import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import axios from "../context/customAxios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import styles from "../styles/components/basketSidebar.module.scss";
import { shimmerEffect } from "./simmerEffect";
import {
  decreaseBasketCount,
  deleteFromBasket,
  increaseBasketCount,
  setTotalPrice,
} from "../app/features/basketSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { updatedPrice } from "./authorize";
function BasketSideBar({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const basketItems = useAppSelector((state) => state.basket.items);
  const totalPrice = useAppSelector((state) => state.basket.totalPrice);
  const dispatch = useAppDispatch();
  const deleteHandler = async (id: number) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(`/basket/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(deleteFromBasket(id));
        const totalPrice = await updatedPrice();
        if (totalPrice !== false) {
          dispatch(setTotalPrice(totalPrice));
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const token = Cookies.get("token");
  const increaseBasketHandler = async (id: number, count: number) => {
    if (count >= 9) return;
    setLoading(true);
    try {
      const response = await axios.put(
        "/basket",
        {
          catalogItemId: id,
          count: count + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(increaseBasketCount(id));
        const totalPrice = await updatedPrice();
        if (totalPrice !== false) {
          dispatch(setTotalPrice(totalPrice));
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const decreaseBasketHandler = async (id: number, count: number) => {
    if (count <= 1) return;
    setLoading(true);
    try {
      const response = await axios.put(
        "/basket",
        {
          catalogItemId: id,
          count: count - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(decreaseBasketCount(id));
        const totalPrice = await updatedPrice();
        if (totalPrice !== false) {
          dispatch(setTotalPrice(totalPrice));
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  return (
    <>
      <motion.div
        className={styles.sidebar}
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        exit={{ x: 1000 }}
        transition={{ bounce: 0, type: "spring", duration: 0.4 }}
      >
        <div className={styles.header}>
          <strong>
            <ShoppingBagIcon className="w-6 h-6" />
            {basketItems.length} آیتم
          </strong>
          <button onClick={() => setShow(false)}>
            <XIcon className="w-7 h-7" />
          </button>
        </div>

        <div className={styles.shoppings}>
          {(!basketItems || !basketItems.length) && (
            <span style={{ margin: "10px", display: "block" }}>
              سبد خرید شما خالی است
            </span>
          )}
          {basketItems && basketItems.length
            ? basketItems.map((item) => {
                return (
                  <div className={styles.item} key={item.catalogItemId}>
                    <div className={styles.counter}>
                      <button
                        disabled={loading}
                        onClick={() =>
                          increaseBasketHandler(item.catalogItemId, item.count)
                        }
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <span>{item.count}</span>
                      <button
                        disabled={loading}
                        onClick={() =>
                          decreaseBasketHandler(item.catalogItemId, item.count)
                        }
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={styles.image}>
                      <Image
                        width={85}
                        height={85}
                        src={item.pictureUri}
                        placeholder="blur"
                        blurDataURL={shimmerEffect(85, 85)}
                        alt="product"
                      />
                    </div>
                    <div className={styles.info}>
                      <Link
                        href={`/product/${item.catalogItemId}`}
                        className={styles.title}
                      >
                        <a>{item.catalogItemName}</a>
                      </Link>
                      <span className={styles.price}>
                        <small>قیمت واحد : </small>
                        {item.price.toLocaleString()} تومان
                      </span>
                    </div>
                    <button
                      disabled={loading}
                      className={styles.delete}
                      onClick={() => deleteHandler(item.catalogItemId)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        <div className={styles.footer}>
          <button>ثبت سفارش ({totalPrice.toLocaleString()} تومان)</button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={() => setShow(false)}
      ></motion.div>
    </>
  );
}

export default BasketSideBar;
