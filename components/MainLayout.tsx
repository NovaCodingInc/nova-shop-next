import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import BasketSideBar from "./BasketSidebar";
import Footer from "./Footer";
import FullPageMenu from "./FullPageMenu";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: any }) {
  const [showBasketSideBar, setShowBasketSidebar] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  useEffect(() => {
    if (showBasketSideBar || showFullMenu)
      document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [showBasketSideBar, showFullMenu]);
  return (
    <>
      <Header setShowBasketSidebar={setShowBasketSidebar} />
      <Navbar />
      <MobileNavbar
        setShowBasketSidebar={setShowBasketSidebar}
        setShowFullMenu={setShowFullMenu}
      />
      <AnimatePresence>
        {showBasketSideBar && <BasketSideBar setShow={setShowBasketSidebar} />}
        {showFullMenu && <FullPageMenu setShow={setShowFullMenu} />}
      </AnimatePresence>
      <main>{children}</main>
      <Footer />
    </>
  );
}
