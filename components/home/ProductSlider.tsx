import styles from "../../styles/components/home/productSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { product_type } from "../apiProducts";
import { shimmerEffect } from "../simmerEffect";
function ProductSlider({ data }: { data: product_type[] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const onBeforeInit = (Swiper: any): void => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
    }
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        resistance={true}
        resistanceRatio={0.5}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        onBeforeInit={onBeforeInit}
        modules={[Navigation, Autoplay]}
        className={styles.swiper}
      >
        {data?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className={styles.productSlide}>
                <Link href={`product/${item.id}`}>
                  <a className={styles.link}></a>
                </Link>

                <Image
                  src={item.pictureUri}
                  width={120}
                  height={120}
                  alt="product"
                  placeholder="blur"
                  blurDataURL={shimmerEffect(120, 120)}
                />
                <h3 className={styles.title}>{item.name}</h3>
                <span className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </span>
              </div>
            </SwiperSlide>
          );
        })}

        <div ref={prevRef} className={styles.prevbtn}>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
        <div ref={nextRef} className={styles.nextbtn}>
          <ChevronLeftIcon className="w-6 h-6" />
        </div>
      </Swiper>
    </>
  );
}

export default ProductSlider;
