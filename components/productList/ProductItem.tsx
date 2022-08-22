import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/components/productList/productItem.module.scss";
import { shimmerEffect } from "../simmerEffect";
function ProductItem({ img, title }: any) {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <Image
          src={img}
          width={200}
          height={200}
          alt="product"
          placeholder="blur"
          blurDataURL={shimmerEffect(200, 200)}
        />
      </div>

      <label className={styles.title}>{title}</label>
      <span className={styles.price}>2,000 تومان</span>
      <Link href={"/"}>
        <a className={styles.btn}>مشاهده و خرید</a>
      </Link>
    </div>
  );
}

export default ProductItem;
