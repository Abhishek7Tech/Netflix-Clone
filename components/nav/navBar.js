import styles from "./navBar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { magic } from "../../lib/magic-client";
export const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const {email,issuer} = await magic.user.getMetadata();
        setEmail(email);

        const idToken = await magic.user.getIdToken();
        setToken(idToken);

      } catch (error) {
        console.log("Email address is invalid", error.message);
      }
    };

    getUserEmail();
  }, []);

  const router = useRouter();
  const dropDownHandler = (e) => {
    e.preventDefault();
    setDropDown(!dropdown);
  };

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("browser/my-list");
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try{
      await magic.user.logout();
      router.push("/login");
      const response = await fetch("/api/logout",{
       method:"GET"
      });
       await response.json();
    }catch (error) {
      console.error("Error Retriving email",error);
      router.push("/login");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
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
        </Link>
        <ul className={styles.navItems}>
          <li onClick={handleOnClickHome} className={styles.navItem}>
            Home
          </li>
          <li onClick={handleOnClickMyList} className={styles.navItem2}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={dropDownHandler} className={styles.usernameBtn}>
              <p className={styles.username}>{email}</p>
              <Image
                src="/static/expand_more.svg"
                alt="expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {dropdown && (
              <div className={styles.navDropdowm}>
                <div>
                    <a onClick={handleSignOut} className={styles.linkName}>Sign out</a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
