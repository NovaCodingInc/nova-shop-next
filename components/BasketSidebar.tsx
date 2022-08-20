import { ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import styles from "../styles/components/basketSideBar.module.scss";
function BasketSideBar({ setShow }: {setShow : React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <>
      <motion.div
        className={styles.sidebar}
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        exit={{ x: 1000 }}
        transition={{ bounce: 0, type: "spring" , duration : 0.4}}
      >
        <div className={styles.header}>
          <strong>
            <ShoppingBagIcon className="w-6 h-6" />3 آیتم
          </strong>
          <button onClick={() => setShow(false)}>
            <XIcon className="w-7 h-7" />
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={() => setShow(false)}
      ></motion.div>
    </>
  );
}

export default BasketSideBar;
