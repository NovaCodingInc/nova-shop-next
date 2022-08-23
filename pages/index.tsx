import type { NextPage } from "next";
import Image from "next/image";
import MainSlider from "../components/home/MainSlider";
import styles from "../styles/components/home/home.module.scss";
import banner1 from "../public/images/ps5.jpg";
import banner2 from "../public/images/xbox-x.jpg";
import Link from "next/link";
import ProductSlider from "../components/home/ProductSlider";
import axios from "axios";
import {
  ChevronDoubleLeftIcon,
  CubeIcon,
  LightningBoltIcon,
} from "@heroicons/react/outline";
import { ORDER_BY, product_type } from "../components/apiProducts";
type propsType = {
  productSliderNewest: product_type[];
  productSliderLeastPrice: product_type[];
};
const Home: NextPage<propsType> = ({
  productSliderNewest,
  productSliderLeastPrice,
}) => {
  return (
    <div className="container py-2">
      <div className={styles.gridArea}>
        <div className={styles.sliderGrid}>
          <MainSlider />
        </div>
        <div className={styles.boxesGrid}>
          <Link href="/">
            <a>
              <Image src={banner1} placeholder={"blur"} alt="baner" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Image src={banner2} placeholder={"blur"} alt="baner" />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.heading}>
          <h4>
            <CubeIcon className="w-7 h-7" />
            ارزان ترین محصولات
          </h4>
          <Link href="/">
            <a>
              مشاهده همه
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <ProductSlider data={productSliderLeastPrice} />
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.heading}>
          <h4>
            <LightningBoltIcon className="w-7 h-7" />
            جدیدترین محصولات
          </h4>
          <Link href="/">
            <a>
              مشاهده همه
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <ProductSlider data={productSliderNewest} />
      </div>
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  try {
    const { data: newest } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}?orderBy=${ORDER_BY.NEWEST}&take=10`
    );

    const { data: leastPrice } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}?orderBy=${ORDER_BY.LEAST_PRICE}&take=10`
    );
    return {
      props: {
        productSliderNewest: newest.products,
        productSliderLeastPrice: leastPrice.products,
      },
    };
  } catch (err) {
    return {
      props: {
        productSliderNewest: [],
        productSliderLeastPrice: [],
      },
    };
  }
}
