import { PhoneIcon, ChevronDownIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/components/navbar.module.scss";
import { category_type } from "./apiProducts";
function Navbar() {
  const [showDropDown, setShowDropDown] = useState(0);
  const [links, setLinks] = useState<any>([]);
  useEffect(() => {
    let linksArr: any = [];
    async function getLinkFunction() {
      linksArr = await getLinks();
      setLinks(linksArr);
    }
    getLinkFunction();
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div style={{ display: "flex" }}>
          {links.map((link: any) => {
            return link.dropdown ? (
              <div className={styles.dropdown} key={link.title}>
                <button
                  className={
                    showDropDown === link.id ? styles.active : undefined
                  }
                  onClick={() =>
                    setShowDropDown((prev) => (prev === link.id ? 0 : link.id))
                  }
                >
                  {link.title}
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                {showDropDown === link.id && (
                  <div className={styles.dropdownList}>
                    {link.dropdownLinks.map((link: any) => {
                      return (
                        <Link href={link.link || "/"} key={link.title}>
                          <a onClick={()=>setShowDropDown(0)}> {link.title} </a>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link href={link.link || "/"} key={link.title}>
                <a className={styles.link}> {link.title} </a>
              </Link>
            );
          })}
        </div>
        <div>
          <a className={styles.mobile} href="tel:123-456-7890">
            123-456-7890
            <PhoneIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </nav>
  );
}
export const getLinks = async () => {
  try {
    const { data: categories } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}categories`
    );
    return [
      {
        title: "صفحه اصلی",
        link: "/",
      },
      {
        title: "محصولات",
        link: "/products",
      },
      {
        title: "درباره ما",
        link: "/about",
      },
      {
        title: "ارتباط با ما",
        link: "/contact",
      },
      {
        title: "لینک تست",
        link: "/test",
      },
      {
        title: "محصولات ویژه ",
        link: "/test",
      },
      {
        id: 1,
        title: "دسته بندی",
        dropdown: true,
        dropdownLinks: categories.map((cat: category_type) => {
          return {
            title: cat.category,
            link: `/products/${cat.category}`,
          };
        }),
      },
    ];
  } catch {
    return [];
  }
};

export default Navbar;
