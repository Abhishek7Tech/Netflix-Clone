import { getVideos } from "../../lib/videos";
import { Card } from "./card";
import styles from "./section-cards.module.css";

export const SectionCards = (props) => {
  const { title, videos, size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          const { imgUrl } = video;
          return <Card id={idx} key={idx} imgUrl={imgUrl.url} size={size} />;
        })}
      </div>
    </section>
  );
};
