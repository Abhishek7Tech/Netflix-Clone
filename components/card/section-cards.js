import { getVideos } from "../../lib/videos";
import { Card } from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
import clx from "classnames";
export const SectionCards = (props) => {
  const { title, videos = [], size,shouldWrap,shouldScales } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={ clx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          const { imgUrl } = video;
      
          return (
            <Link key={idx} href={`/videos/${video.id}`}>
              <a>
              <Card id={idx} imgUrl={imgUrl.url || imgUrl} size={size} scales = {shouldScales} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
