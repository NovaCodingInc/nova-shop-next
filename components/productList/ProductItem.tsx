import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/components/productList/productItem.module.scss";
import { shimmerEffect } from "../simmerEffect";

type propsType = {
  img: string;
  title: string;
  id: number;
};
function ProductItem({ img, title, id }: propsType) {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <Link href={`/product/${id}`}>
          <a>
            <Image
              src={img}
              width={200}
              height={200}
              alt="product"
              placeholder="blur"
              blurDataURL={shimmerEffect(200, 200)}
            />
          </a>
        </Link>
      </div>

      <Link href={`/product/${id}`}>
        <a className={styles.title}>{title}</a>
      </Link>
      <span className={styles.price}>2,000 تومان</span>
      <Link href={`/product/${id}`}>
        <a className={styles.btn}>مشاهده و خرید</a>
      </Link>
    </div>
  );
}

export default ProductItem;
