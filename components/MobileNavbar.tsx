import {
  UserIcon,
  ViewGridIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import styles from "../styles/components/mobileNavbar.module.scss";
function MobileNavbar({
  setShowBasketSidebar,
  setShowFullMenu,
  basketCount
}: {
  setShowBasketSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFullMenu: React.Dispatch<React.SetStateAction<boolean>>;
  basketCount : number
}) {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className={styles.icons}>
          <Link href="/">
            <button className={`${styles.item}`}>
              <HomeIcon className="w-6 h-6" />
              خانه
            </button>
          </Link>
          <Link href="/auth">
            <button className={`${styles.item}`}>
              <UserIcon className="w-6 h-6" />
              حساب
            </button>
          </Link>
          <button
            className={`${styles.item}`}
            onClick={() => setShowBasketSidebar(true)}
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <span>{basketCount}</span>
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
