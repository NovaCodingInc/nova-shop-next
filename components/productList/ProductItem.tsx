import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/components/productList/productItem.module.scss";

type propsType = {
  img: string;
  title: string;
  id: number;
  price : number
};
function ProductItem({ img, title, id , price }: propsType) {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <Link href={`/product/${id}`}>
          <a>
            <Image src={img} width={200} height={200} alt="product" />
          </a>
        </Link>
      </div>

      <Link href={`/product/${id}`}>
        <a className={styles.title}>{title}</a>
      </Link>
      <span className={styles.price}>{price.toLocaleString()} تومان</span>
      <Link href={`/product/${id}`}>
        <a className={styles.btn}>مشاهده و خرید</a>
      </Link>
    </div>
  );
}

export default ProductItem;
