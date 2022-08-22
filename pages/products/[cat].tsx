import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import FullLoading from "../../components/FullLoading";
import ProductItem from "../../components/productList/ProductItem";
import styles from "../../styles/components/productList/productList.module.scss";
function Products({ products }: any) {
  const router = useRouter();
  if (router.isFallback) return <FullLoading />;
  return (
    <div className="container py-2">
      <div className={styles.wrapper}>
        <div className={styles.sidebar}></div>
        <div className={styles.list}>
          {products.map((product: any) => {
            return (
              <ProductItem
                key={product.id}
                img={product.thumbnail}
                title={product.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${params?.cat}`
  );
  if (data.products <= 0) return { notFound: true };
  return {
    props: {
      products: data.products,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cat: "smartphones" } }],
    fallback: true,
  };
};
