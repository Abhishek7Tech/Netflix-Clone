// import videosData from "../data/videos.json";
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1

export const getReuestedVideos = async (urlQuery) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEYS;
  const commonUrl = "https://youtube.googleapis.com/youtube/v3";
  try{
  const response = await fetch(`
  ${commonUrl}/${urlQuery}&maxResults=25&key=${YOUTUBE_API_KEY}
`);
  const videosData = await response.json();

  if(videosData?.error){
    console.error("Something Went Wrong, Data not fetched", videosData.error);
    return [];
  }

  return videosData.items.map((item,idx) => {
    return {
      id: item?.id?.videoId || idx,
      title: item?.snippet?.title,
      imgUrl: item?.snippet?.thumbnails?.high,
    };
  });
}catch(err){
  console.error("Something Went Wrong", err.message);
}
};

export const getVideos = async (url) => {
const URL = `search?part=snippet&q=${url}`;
return getReuestedVideos(URL);
}

export const getPopularVideos = async() => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
 return getReuestedVideos(URL);
}