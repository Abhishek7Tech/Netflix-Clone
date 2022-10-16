import Head from "next/head";
import { Banner } from "../components/banner/banner";
import { Navbar } from "../components/nav/navBar";
import styles from "../styles/Home.module.css";
import { SectionCards } from "../components/card/section-cards";
import { getVideos } from "../lib/videos";
export default function Home() {
 const videos = getVideos();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar userName={"Abhishektab45@gmail.com"} />
      <Banner
        title="Stranger Things"
        subTitle="When a young boy vanishes, a small town uncovers a mystery
         involving secret experiments, terrifying supernatural forces and one strange little girl."
        imgUrl="/static/Stranger.webp"
      />
      <div className={styles.sectionWrapper}>
      <SectionCards title="Disney" videos={videos} size="large"/>
      <SectionCards title="Disney" videos={videos} size="medium"/>
      
      </div>
     
    </div>
  );
}
