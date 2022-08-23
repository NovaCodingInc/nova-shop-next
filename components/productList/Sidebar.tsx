import { SetStateAction } from "react";
import styles from "../../styles/components/productList/productList.module.scss";
import { ORDER_BY } from "../apiProducts";

function Sidebar({
  orderBy,
  setOrderBy,
}: {
  orderBy: number;
  setOrderBy: React.Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sort}>
        <span>مرتب سازی بر اساس : </span>

        <button
          onClick={() => setOrderBy(ORDER_BY.NEWEST)}
          className={orderBy === ORDER_BY.NEWEST ? styles.active : ""}
        >
          جدید ترین
        </button>
        <button
          onClick={() => setOrderBy(ORDER_BY.OLDEST)}
          className={orderBy === ORDER_BY.OLDEST ? styles.active : ""}
        >
          قدیمی ترین
        </button>
        <button
          onClick={() => setOrderBy(ORDER_BY.LEAST_PRICE)}
          className={orderBy === ORDER_BY.LEAST_PRICE ? styles.active : ""}
        >
          ارزان ترین
        </button>
        <button
          onClick={() => setOrderBy(ORDER_BY.MOST_PRICE)}
          className={orderBy === ORDER_BY.MOST_PRICE ? styles.active : ""}
        >
          گران ترین
        </button>
      </div>
      <div className={styles.availaible}>
        <span>نمایش کالاهای موجود</span>
        <input type="checkbox" hidden={true} id="avilaible" />
        <label className={styles.switch} htmlFor="avilaible"></label>
      </div>
    </div>
  );
}

export default Sidebar;
