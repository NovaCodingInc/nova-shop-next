import ProductItem from "../../components/productList/ProductItem";
import styles from "../../styles/components/productList/productList.module.scss";
function Products() {
  return (
    <div className="container py-2">
      <div className={styles.wrapper}>
        <div className={styles.sidebar}></div>
        <div className={styles.list}>
          <ProductItem />
        </div>
      </div>
    </div>
  );
}

export default Products;

export async function getSataticProps(){
    
}
