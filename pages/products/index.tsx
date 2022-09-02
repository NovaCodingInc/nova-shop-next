import axios from "../../context/customAxios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { product_type } from "../../components/apiProducts";
import Pagination from "../../components/productList/Pagination";
import ProductItem from "../../components/productList/ProductItem";
import Sidebar from "../../components/productList/Sidebar";
import { shimmerEffect } from "../../components/simmerEffect";
import styles from "../../styles/components/productList/productList.module.scss";

type propsType = {
  productsProp: product_type[];
  totalPages: number;
};
const Products: NextPage<propsType> = ({ productsProp, totalPages }) => {
  const router = useRouter();
  const [products, setProducts] = useState(productsProp);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState(
    router.query.orderBy ? parseInt(router.query.orderBy.toString()) : 0
  );
  const preLoadingArr = [1, 2, 3, 4, 5, 6];
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setPage(1);
  }, [router.query.cat]);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    async function chnagePage() {
      try {
        const { data } = await axios.get(
          `catalog/?pageId=${page}&orderBy=${orderBy}&search=${router.query.search}`
        );
        setProducts(data.products);
        window.scrollTo(0, 0);
        setLoading(false);
      } catch (err) {
        setProducts([]);
        setLoading(false);
      }
    }
    chnagePage();
  }, [page]);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    async function filterSort() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `catalog/?pageId=1&search=${router.query.search}&orderBy=${orderBy}`
        );
        setProducts(data.products);
        setPage(1);
        router.push(
          {
            pathname: `/products/`,
            query: { search : router.query.search , orderBy },
          },
          undefined,
          { shallow: true }
        );
        setLoading(false);
      } catch (err) {
        setProducts([]);
        setLoading(false);
      }
    }
    filterSort();
  }, [orderBy]);

  return (
    <div className="container py-2">
      <div className={styles.wrapper}>
        <Sidebar orderBy={orderBy} setOrderBy={setOrderBy} />
        <div className={styles.list}>
          {loading ? (
            preLoadingArr.map((i) => (
              <img key={i} src={shimmerEffect(450, 450)} alt="shimmer" />
            ))
          ) : products?.length <= 0 || !products ? (
            <div className={styles.error}>محصولی برای نمایش وجود ندارد</div>
          ) : (
            products.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  img={product.pictureUri}
                  title={product.name}
                  id={product.id}
                />
              );
            })
          )}
        </div>
      </div>
      {!loading && products && products.length > 0 && (
        <div className={styles.paginationWrapper}>
          <div className={styles.space}></div>
          <Pagination page={page} setPage={setPage} total={totalPages} />
        </div>
      )}
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const orderQ = !!query?.orderBy ? `&orderBy=${query.orderBy}` : "";
  try {
    const { data } = await axios.get(
      `catalog/?pageId=1${orderQ}&search=${query.search}`
    );
    if (data.products.length > 0) {
      return {
        props: {
          productsProp: data.products,
          totalPages: parseInt(data.pageCount),
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
        props: {
          productsProp: [],
          totalPages: 0,
        },
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {
        productsProp: [],
        totalPages: 0,
      },
    };
  }
};
