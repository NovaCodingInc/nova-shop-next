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
function ProductSlider({ data }: { data: [] }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const onBeforeInit = (Swiper: any): void => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
    }
  };
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#d4d4d4" offset="20%" />
      <stop stop-color="#e8e8e8" offset="50%" />
      <stop stop-color="#d4d4d4" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#d4d4d4" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return (
    <>
      <Swiper
        spaceBetween={30}
        resistance={true}
        resistanceRatio={0.5}
        breakpoints={{
          0 : {
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
        {data.map((item: any) => {
          return (
            <SwiperSlide key={item.id}>
              <div className={styles.productSlide}>
                <Link href={`product/${item.id}`}>
                  <a className={styles.link}></a>
                </Link>

                <Image
                  src={item.thumbnail}
                  width={120}
                  height={120}
                  alt="product"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(120, 120)
                  )}`}
                />
                <h3 className={styles.title}>{item.title}</h3>
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
