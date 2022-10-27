import Head from "next/head";
import { SectionCards } from "../../components/card/section-cards";
import { Navbar } from "../../components/nav/navBar";
import { redirectUser } from "../../lib/utils";
import { getMyListVideos } from "../../lib/videos";
import styles from "../../styles/mylist.module.css";

export async function getServerSideProps(context) {
  const {token,userId} = await redirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  };

  const myList = await getMyListVideos(token,userId);

  return {
    props:{myList},
  }
}

const MyList = (props) => {
  const {myList} = props;
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards title="My List" videos={myList} size="small" shouldWrap={true} shouldScales={false} />
        </div>
      </main>
    </div>
  );
};

export default MyList;
