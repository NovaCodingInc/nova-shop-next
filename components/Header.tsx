import styles from "../styles/components/header.module.scss";
import {
  SearchIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { SetStateAction, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
function Header({
  setShowBasketSidebar,
  basketCount
}: {
  setShowBasketSidebar: React.Dispatch<SetStateAction<boolean>>;
  basketCount : number
}) {
  const serachInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((serachInput?.current?.value.length || 0) < 3) return;
    router.push(`/products/?search=${serachInput?.current?.value}`);
  };
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.icons}>
            <button onClick={() => setShowBasketSidebar(true)}>
              <span>{basketCount}</span>
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
            <Link href="/auth">
              <button>
                <UserIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
          <div className={styles.searchBar}>
            <form onSubmit={searchHandler}>
              <input
                type="text"
                placeholder="جستجو کنید ..."
                ref={serachInput}
              />
              <span>
                <SearchIcon className="w-5 h-5" />
              </span>
            </form>
          </div>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image
                  src={"/images/logo-nova-shop.png"}
                  width={100}
                  height={50}
                  alt="logo"
                />
              </a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
