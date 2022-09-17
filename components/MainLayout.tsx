import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import dynamic from "next/dynamic";
import axios from "../context/customAxios";
import { category_type } from "./apiProducts";
import { authorize, getCustomerBasket } from "./authorize";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetUserInfo, setUserInfo } from "../app/features/userSlice";
import BasketSideBar from "./BasketSidebar";
import FullPageMenu from "./FullPageMenu";
import { addAllToBasket, setTotalPrice } from "../app/features/basketSlice";
import { useRouter } from "next/router";

const getLinks = async () => {
  try {
    const { data: categories } = await axios.get(`catalog/categories`);
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
  const [links, setLinks] = useState<any>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const basketCount = useAppSelector((state) => state.basket.items).length;
  useEffect(() => {
    let linksArr: any = [];
    (async () => {
      linksArr = await getLinks();
      setLinks(linksArr);
      authorize()
        .then((result) => {
          if (result !== false) {
            dispatch(setUserInfo({ email: result.email, token: result.token }));
            return getCustomerBasket();
          } else {
            Cookies.remove("token");
            dispatch(resetUserInfo());
            throw new Error("error");
          }
        })
        .then((basket) => {
          if (basket !== false) {
            dispatch(addAllToBasket(basket.items));
            dispatch(setTotalPrice(basket.totalPrice));
          }
        })
        .catch(() => null);
    })();
  }, []);
  useEffect(() => {
    setShowBasketSidebar(false);
  }, [router.query]);
  useEffect(() => {
    if (showBasketSideBar || showFullMenu)
      document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [showBasketSideBar, showFullMenu]);
  return (
    <>
      <Header
        setShowBasketSidebar={setShowBasketSidebar}
        basketCount={basketCount}
      />
      <Navbar links={links} />
      <MobileNavbar
        setShowBasketSidebar={setShowBasketSidebar}
        setShowFullMenu={setShowFullMenu}
        basketCount={basketCount}
      />
      <AnimatePresence>
        {showBasketSideBar && <BasketSideBar setShow={setShowBasketSidebar} />}
        {showFullMenu && (
          <FullPageMenu setShow={setShowFullMenu} links={links} />
        )}
      </AnimatePresence>
      <main>{children}</main>
      <Footer />
    </>
  );
}
