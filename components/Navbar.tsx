import { PhoneIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/components/navbar.module.scss";
function Navbar() {
  const [showDropDown, setShowDropDown] = useState(0);

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div style={{ display: "flex" }}>
          {links.map((link) => {
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
                    {link.dropdownLinks.map((link) => {
                      return (
                        <Link href={link.link || "/"} key={link.title}>
                          <a> {link.title} </a>
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

export const links = [
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
    dropdownLinks: [
      {
        title: "دسته بندی اول",
        link: "/1",
      },
      {
        title: "دسته بندی دوم",
        link: "/2",
      },
      {
        title: "دسته بندی سوم",
        link: "/3",
      },
      {
        title: "دسته بندی چهارم",
        link: "/4",
      },
    ],
  },
];

export default Navbar;
