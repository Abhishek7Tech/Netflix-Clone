import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/loading/loading";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // async function isLoggined() {
  //   //   const isLoggedIn = await magic.user.isLoggedIn();

  //   //   isLoggedIn ? router.push("/") : router.push("/login");
  //   // }

  //   // isLoggined();
  // }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
