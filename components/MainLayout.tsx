import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import dynamic from "next/dynamic";
import axios from "axios";
import { category_type } from "./apiProducts";
const BasketSideBar = dynamic(() => import("./BasketSidebar"), {
  loading: () => <p>بارگذاری ...</p>,
});
const FullPageMenu = dynamic(() => import("./FullPageMenu"), {
  loading: () => <p>بارگذاری ...</p>,
});

const getLinks = async () => {
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

export default function Layout({ children }: { children: any }) {
  const [showBasketSideBar, setShowBasketSidebar] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [links , setLinks] = useState<any>([])
  useEffect(() => {
    let linksArr: any = [];
   ( async () => {
      linksArr = await getLinks();
      setLinks(linksArr);
    })()
 
  }, []);
  useEffect(() => {
    if (showBasketSideBar || showFullMenu)
      document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [showBasketSideBar, showFullMenu]);
  return (
    <>
      <Header setShowBasketSidebar={setShowBasketSidebar} />
      <Navbar links={links} />
      <MobileNavbar
        setShowBasketSidebar={setShowBasketSidebar}
        setShowFullMenu={setShowFullMenu}
      />
      <AnimatePresence>
        {showBasketSideBar && <BasketSideBar setShow={setShowBasketSidebar} />}
        {showFullMenu && <FullPageMenu setShow={setShowFullMenu} links={links} />}
      </AnimatePresence>
      <main>{children}</main>
      <Footer />
    </>
  );
}
