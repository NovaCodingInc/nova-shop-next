import type { NextPage } from "next";
import Image from "next/image";
import MainSlider from "../components/home/MainSlider";
import styles from "../styles/components/home/home.module.scss";
import banner1 from "../public/images/ps5.jpg";
import banner2 from "../public/images/xbox-x.jpg";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <div className="container py-2">
      <div className={styles.gridArea}>
        <div className={styles.sliderGrid}>
          <MainSlider />
        </div>
        <div className={styles.boxesGrid}>
          <Link href="/">
            <a>
              <Image src={banner1} placeholder={"blur"} />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Image src={banner2} placeholder={"blur"} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
