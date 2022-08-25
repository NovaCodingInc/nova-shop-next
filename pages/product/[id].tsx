import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { product_type } from "../../components/apiProducts";
import FullLoading from "../../components/FullLoading";
import Gallery from "../../components/single-product/Gallery";
import styles from "../../styles/components/singleProduct/singleProductPage.module.scss";
import type { NextPage } from "next";
import {
  ChevronDoubleLeftIcon,
  LightningBoltIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { StarIcon as StarFilledIcon } from "@heroicons/react/solid";
import Order from "../../components/single-product/Order";
import ProductSlider from "../../components/home/ProductSlider";
import Link from "next/link";

type propsType = {
  product: product_type;
  productsSameCat: product_type[];
};
const Product: NextPage<propsType> = ({ product, productsSameCat }) => {
  const router = useRouter();
  if (router.isFallback) return <FullLoading />;
  return (
    <div className="container py-2">
      <div className={styles.infoWrapper}>
        <div className={styles.gallery}>
          <Gallery galleries={product.galleries} main={product.pictureUri} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h1>{product.name}</h1>
            <div className={styles.stars}>
              <StarFilledIcon className="w-5 h-5" />
              <StarFilledIcon className="w-5 h-5" />
              <StarFilledIcon className="w-5 h-5" />
              <StarIcon className="w-5 h-5" />
              <StarIcon className="w-5 h-5" />
            </div>
          </div>
          <div className={styles.summary}>
            <p>{product.summary}</p>
          </div>
          <div className={styles.price}>
            <span className={styles.priceSpan}>
              {product.price.toLocaleString()} تومان
            </span>
            <span className={styles.available}>
              ( {product.quantityInStock ? "موجود است" : "نا موجود"} )
            </span>
          </div>
          <div className={styles.order}>
            <Order />
          </div>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.heading}>
          <h4>
            <LightningBoltIcon className="w-7 h-7" />
            محصولات مرتبط
          </h4>
          <Link href={`/products/${product.category}`}>
            <a>
              مشاهده همه
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <ProductSlider data={productsSameCat} />
      </div>
    </div>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: product } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${params?.id}`
    );
    const { data: productsSameCat } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}?take=10&category=${product.category}`
    );

    if (product.status?.toString() === "404")
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    return {
      props: {
        product,
        productsSameCat: productsSameCat.products,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
};
