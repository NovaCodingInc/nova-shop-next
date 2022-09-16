import { PhoneIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/components/navbar.module.scss";
function Navbar({links}:{links : any[]}) {
  const [showDropDown, setShowDropDown] = useState(0);

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div style={{ display: "flex" }}>
          {!links.length ? <p>در حال بارگذاری ...</p> : links.map((link: any) => {
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
                          <a onClick={() => setShowDropDown(0)}>
                            {" "}
                            {link.title}{" "}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link href={link.link || "/"} key={link.title}>
                <a className={styles.link} onClick={() => setShowDropDown(0)}>
                  {" "}
                  {link.title}{" "}
                </a>
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


export default React.memo(Navbar);
