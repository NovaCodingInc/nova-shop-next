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
const Home: NextPage = ({ productSlider1, productSlider2 }: any) => {
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
            محصولات پر فروش
          </h4>
          <Link href="/">
            <a>
              مشاهده همه
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <ProductSlider data={productSlider1} />
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
        <ProductSlider data={productSlider2} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data: data1 } = await axios.get(
    "https://dummyjson.com/products?limit=10"
  );

  const { data: data2 } = await axios.get(
    "https://dummyjson.com/products?limit=10&skip=10"
  );
  return {
    props: {
      productSlider1: data1.products,
      productSlider2: data2.products,
    },
  };
}

export default Home;
