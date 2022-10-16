import styles from "./navBar.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
export const Navbar = (props) => {

  const { userName } = props;
  const [dropdown, setDropDown] = useState(false);
  
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
             <Link className={styles.logoLink} href="/">
           <a> 
             <div className={styles.logoWrapper}>
             <Image src={"/static/netflix.svg"} alt="Netflix logo" width="128px" height="38px"></Image>
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
              <p className={styles.username}>{userName}</p>
              <Image src="/static/expand_more.svg" alt="expand dropdown" width="24px" height="24px" />
            </button>
            
            {dropdown && (
                <div className={styles.navDropdowm}>
                    <div>
                  <Link href="/login">
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
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
