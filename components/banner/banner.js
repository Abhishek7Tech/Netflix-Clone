import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
export const Banner = (props) => {
  const { title, subTitle, imgUrl,videoId } = props;
  const router = useRouter();

  const handleOnPlay = () => {
    router.push(`/videos/${videoId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.subTitle}>{subTitle}</h4>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
             <Image src="/static/play.svg" alt="Play icon" width="32px" height="32px"/>
             <span className={styles.playText}> Play </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    </div>
  );
};