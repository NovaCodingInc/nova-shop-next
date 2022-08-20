import {
  UserIcon,
  ViewGridIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import styles from "../styles/components/mobileNavbar.module.scss";
function MobileNavbar({
  setShowBasketSidebar,
  setShowFullMenu,
}: {
  setShowBasketSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFullMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className={styles.icons}>
          <button className={`${styles.item} ${styles.active}`}>
            <HomeIcon className="w-6 h-6" />
            خانه
          </button>
          <button className={`${styles.item}`}>
            <UserIcon className="w-6 h-6" />
            حساب
          </button>
          <button
            className={`${styles.item}`}
            onClick={() => setShowBasketSidebar(true)}
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <span>3</span>
            سبد
          </button>
          <button
            className={`${styles.item}`}
            onClick={() => setShowFullMenu(true)}
          >
            <ViewGridIcon className="w-6 h-6" />
            منو
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
