import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "../../styles/components/home/mainSlider.module.scss";
import Image from "next/image";
import slide1 from "../../public/images/slide-1.jpg";
import slide2 from "../../public/images/slide-2.jpg";
import slide3 from "../../public/images/slide-3.jpg";
import { Autoplay } from "swiper";
import Link from "next/link";
function MainSlider() {
  return (
    <Swiper
      spaceBetween={15}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      modules={[Autoplay]}
      className={styles.swiper}
    >
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <Link href="/">
            <a>
              <Image src={slide1} placeholder="blur" alt="slide show" />
            </a>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <Link href="/">
            <a>
              <Image src={slide2} placeholder="blur" alt="slide show" />
            </a>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <Link href="/">
            <a>
              <Image src={slide3} placeholder="blur" alt="slide show" />
            </a>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default MainSlider;
