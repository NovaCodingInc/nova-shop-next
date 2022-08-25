import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import styles from "../../styles/components/singleProduct/singleProductPage.module.scss";

function Order() {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className={styles.counter}>
        <button onClick={() => setCount((prev) => prev + 1)} disabled={count >= 9}>
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
        <button>افزودن به سبد خرید</button>
      </div>
    </>
  );
}

export default Order;
