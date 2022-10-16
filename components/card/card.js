import styles from "./card.module.css";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import classNames from "classnames";

export const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80",
    size = "medium",
    id
  } = props;
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const scale = id === 0 ? {scaleY:1.1} : {scale:1.1};

  //Image Error Handling//
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const onErrorHandler = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80"
    );
  };



  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{
          ...scale,
          transition: { duration: 0.2},
        }}
        className={classNames(classMap[size], styles.imgMotionWrapper)}
      >
        <Image
          onError={onErrorHandler}
          className={styles.cardImg}
          src={imgSrc}
          alt="images"
          layout="fill"
        ></Image>
      </motion.div>
    </div>
  );
};
