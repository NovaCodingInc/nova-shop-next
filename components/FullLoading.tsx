import styles from "../styles/components/fullLoading.module.scss";
function FullLoading() {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default FullLoading;
