import styles from "../styles/components/footer.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
     
      <div className={styles.icon}>
        <a href="">

        </a>
        <a href=""></a>
      </div>
      <p className={styles.text}>
      © 2022 تمامی حقوق محفوظ است | 
      طراحی و توسعه : 
         <a href="novacoding.ir" target="_blank">
          نوا <span className={styles.primary}>کدینگ</span>
        </a>
      </p>
         
      </div>
    </footer>
  );
}

export default Footer;
