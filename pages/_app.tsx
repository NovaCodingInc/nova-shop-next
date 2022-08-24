import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "../components/MainLayout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
