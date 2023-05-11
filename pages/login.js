import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";
const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [usrMsg, showUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //handleling router events//
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
  }, [router]);

  const handleEmailInput = (e) => {
    e.preventDefault();
    const email = e.target.value;
    setEmail(email);
  };
  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      showUserMsg("Email is Required.");
      setEmail("");
      return;
    }

    if (email !== "abhishektab45@gmail.com") {
      showUserMsg("User not found!");
      setEmail("");
      return;
    }
    if (email.includes("@") && email === "abhishektab45@gmail.com") {
      showUserMsg("");
      setIsLoading(true);

      try {
        const token = await magic.auth.loginWithMagicLink({ email });
        console.log("TOKEN", token);
        setIsLoading(true);
        if (token) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          console.log("RES", loggedInResponse);
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            showUserMsg("Something went wrong logging in");
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Something went wrong with magic links", error);
      }

      //redirect to home//
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign In</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="Netflix logo"
                width="128px"
                height="38px"
              ></Image>
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            onChange={handleEmailInput}
            type="email"
            placeholder="Email Address"
            className={styles.emailInput}
            required
          ></input>
          {usrMsg && <p className={styles.userMsg}> {usrMsg} </p>}
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
