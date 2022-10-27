import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/videos.module.css";
import cls from "classnames";
import { getSpecificVideo } from "../../lib/videos";
import { Navbar } from "../../components/nav/navBar";
import Like from "../../components/buttons/like-btn";
import DisLike from "../../components/buttons/dislike-btn";
import { useState, useEffect } from "react";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getSpecificVideo(videoId);
  const video = videoArray.length > 0 ? videoArray[0] : {};
  // const video = {};

  return {
    props: {
      video,
    },

    revalidate: 20,
  };
}

export async function getStaticPaths() {
  const ids = ["b9EkMc79ZSU", "_InqQJRqGW4", "jrLhP5sK2wI"];

  const paths = ids.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Videos = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.videoId;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  useEffect(() => {
    const getFavourites = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET"
      });
      const data = await response.json();

      if(data > 0){
        const favourited = data.stats[0].favourited;

        favourited === 1 ? setToggleLike(true) : setToggleDislike(true);
      }
    };
    getFavourites();
  }, []);

  const getFavourites = async (favourited) => {
    return await fetch(`/api/stats`, {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const toggleLikeHandler = async () => {
    setToggleLike(!toggleLike);
    setToggleDislike(toggleLike);

    const val = !toggleLike;
    const favourites = val ? 1 : 0;
 await getFavourites(favourites);

  };

  const toggleDislikeHandler = async () => {
    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);

    const val = !toggleDislike;

    const favourites = val ? 0 : 1;
 await getFavourites(favourites);

  };

  const {
    title,
    publishTime,
    description,
    channelTitle = "",
    statistics,
  } = video;
  const { viewCount } = statistics || 0;
  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        overlayClassName={styles.overlay}
        contentLabel="Watch Videos"
        className={styles.modal}
        onRequestClose={() => router.back()}
      >
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="390"
          className={styles.videoPlayer}
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <button onClick={toggleLikeHandler} className={styles.likeBtnWrapper}>
            <div className={styles.btnWrapper}>
              <Like selected={toggleLike} />
            </div>
          </button>

          <button
            onClick={toggleDislikeHandler}
            className={styles.likeBtnWrapper}
          >
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.col2}>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>{channelTitle}</span>
            </p>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count:</span>
              <span className={styles.channelTitle}>{viewCount}</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Videos;
