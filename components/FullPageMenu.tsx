import { ChevronDownIcon, ViewGridIcon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../styles/components/fullpageMenu.module.scss";
import { links } from "./Navbar";
function FullPageMenu({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <motion.div
        className={styles.sidebar}
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        exit={{ x: 1000 }}
        transition={{ bounce: 0, type: "spring", duration: 0.4 }}
      >
        <div className={styles.header}>
          <strong>
            <ViewGridIcon className="w-6 h-6" />
            منو
          </strong>
          <button onClick={() => setShow(false)}>
            <XIcon className="w-7 h-7" />
          </button>
        </div>
        <div className={styles.items}>
          {links.map((link) => {
            return !link.dropdown ? (
              <Link href={link.link || "/"} key={link.title}>
                <a className={styles.item}> {link.title} </a>
              </Link>
            ) : (
              <div className={styles.dropdown} key={link.title}>
                <span>{link.title} : </span>
                <div className={styles.dropdownList}>
                  {link.dropdownLinks.map((link) => {
                    return (
                      <Link href={link.link} key={link.title}>
                        <a className={styles.item}> {link.title} </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
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

export default FullPageMenu;
