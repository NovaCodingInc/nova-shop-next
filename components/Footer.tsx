import styles from "../styles/components/footer.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
      <p className={styles.text}>
      © 2022 تمامی حقوق محفوظ است | 
      طراحی و توسعه : 
         <a href="https://novacoding.ir" target="_blank" rel="noreferrer">
          نوا <span className={styles.primary}>کدینگ</span>
        </a>
      </p>
         
      </div>
    </footer>
  );
}

export default Footer;
