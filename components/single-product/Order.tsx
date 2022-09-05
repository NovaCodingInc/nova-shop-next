import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/components/singleProduct/singleProductPage.module.scss";

function Order({ payload }: any) {
  const [count, setCount] = useState(1);
  const { query } = useRouter();

  useEffect(() => {
    setCount(1);
  }, [query.id]);

  const addToBasket = () => {
    return false;
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
