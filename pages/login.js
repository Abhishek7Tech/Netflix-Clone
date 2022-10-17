import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Login.module.css";
const Login = () => {
    const router = useRouter();

    const [email,setEmail] = useState("");
    const [usrMsg, showUserMsg] = useState("");

    const handleEmailInput = (e) => {
      e.preventDefault();
      const email = e.target.value;
      setEmail(email);      
    }  
    const handleLoginWithEmail = (e) => {
          e.preventDefault();
          console.log("Hi There");

          if(!email.includes("@") ){
            showUserMsg("Email is Required.");
            setEmail("");
           return;
          }

          if(email !== "abhishektab45@gmail.com"){
            showUserMsg("User not found!");
            setEmail("");
            return;
          }
          if(email.includes("@") && email === "abhishektab45@gmail.com"){
            showUserMsg("");
            router.push("/");
            //redirect to home//
          };
           

      }
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
          <input onChange={handleEmailInput} type="email" placeholder="Email Address" className={styles.emailInput} required></input>
         {usrMsg && <p className={styles.userMsg}> {usrMsg} </p>}
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
