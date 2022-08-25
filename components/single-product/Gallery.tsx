import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/components/singleProduct/gallery.module.scss";
import { shimmerEffect } from "../simmerEffect";
type gallryies = {
  galleries: {
    id: number;
    catalogItemId: number;
    displayPriority: number;
    pictureFileName: string;
    pictureUri: string;
  }[];
  main: string;
};
function Gallery({ galleries, main }: gallryies) {
  const [mainSrc, setMainSrc] = useState(main);
  if (galleries.length <= 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainImage}>
          <Image
            src={mainSrc}
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={shimmerEffect(300, 300)}
            alt='product pic'
          />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainImage}>
        <Image
          src={mainSrc}
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL={shimmerEffect(300, 300)}
          alt='product pic'
        />
      </div>
      <div className={styles.thumbs}>
        {galleries.map((img) => {
          return (
            <div
              className={styles.item}
              key={img.id}
              onClick={() => setMainSrc(img.pictureUri)}
            >
              <Image
                src={img.pictureUri}
                width={70}
                height={70}
                placeholder="blur"
                blurDataURL={shimmerEffect(300, 300)}
                quality={50}
                alt='product pic'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
