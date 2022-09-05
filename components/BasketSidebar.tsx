import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/components/basketSideBar.module.scss";
import { shimmerEffect } from "./simmerEffect";
function BasketSideBar({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
            <ShoppingBagIcon className="w-6 h-6" />3 آیتم
          </strong>
          <button onClick={() => setShow(false)}>
            <XIcon className="w-7 h-7" />
          </button>
        </div>
        {/* <div className={styles.shoppings}>
          {(!basketData || !basketData.length) && <span>سبد خرید خالی است</span> }
          {basketData.map((item : any) => {
            return(
              <div className={styles.item} key={item.id}>
              <div className={styles.counter}>
                <button>
                  <PlusIcon className="w-4 h-4" />
                </button>
                <span>{item.count}</span>
                <button>
                  <MinusIcon className="w-4 h-4" />
                </button>
              </div>
              <div className={styles.image}>
                <Image
                  width={85}
                  height={85}
                  src={item.image}
                  placeholder="blur"
                  blurDataURL={shimmerEffect(85, 85)}
                  alt="product"
                />
              </div>
              <div className={styles.info}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.price}>{item.price.toLocaleString()} تومان</span>
              </div>
              <button className={styles.delete}>
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            )
          })}
        </div> */}
        <div className={styles.footer}>
          <button>ثبت سفارش (23,000 تومان)</button>
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
