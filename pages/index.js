import Head from "next/head";
import { Banner } from "../components/banner/banner";
import { Navbar } from "../components/nav/navBar";
import styles from "../styles/Home.module.css";
import { SectionCards } from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";
//ServerSide Rendering//
export async function getServerSideProps() {
  const animeVideos = await getVideos("anime trailer");
  const documentryVideos = await getVideos("netflix documentry trailer");
  const travelVideos = await getVideos("travel videos");
  const popularVideos = await getPopularVideos();
  return {
    props: { animeVideos, documentryVideos, travelVideos,  popularVideos },
  };
}

export default function Home(props) {
  const { animeVideos, documentryVideos, travelVideos, popularVideos } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
        videoId="b9EkMc79ZSU"
          title="Stranger Things"
          subTitle="When a young boy vanishes, a small town uncovers a mystery
         involving secret experiments, terrifying supernatural forces and one strange little girl."
          imgUrl="/static/Stranger.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Anime" videos={animeVideos} size="large" />
          <SectionCards
            title="Documentries"
            videos={documentryVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
          <SectionCards title="Travel" videos={travelVideos} size="medium" />
        </div>
      </div>
    </div>
  );
}
