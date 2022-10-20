import { getVideos } from "../../lib/videos";
import { Card } from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
export const SectionCards = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          const { imgUrl } = video;
          return (
            <Link key={idx} href={`/videos/${video.id}`}>
              <a>
              <Card id={idx} imgUrl={imgUrl.url} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
