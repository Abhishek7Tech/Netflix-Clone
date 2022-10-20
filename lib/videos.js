import videosTestData from "../data/videos.json";
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1

const fetchVideos = async(url) => {
 
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEYS;
  const commonUrl = "https://youtube.googleapis.com/youtube/v3"; 
    const response = await fetch(`
    ${commonUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}
  `);
  const videosData = await response.json();
    return videosData;
 
}


export const getReuestedVideos = async (urlQuery) => {
  
  try{
  const videosData =  await fetchVideos(urlQuery);
  if(videosData?.error){
    console.error("Something Went Wrong, Data not fetched", videosData.error);
    return [];
  }

  return videosData.items.map((item,idx) => {
    // console.log({item});
    return {
      id: item?.id?.videoId || idx,
      title: item?.snippet?.title,
      imgUrl: item?.snippet?.thumbnails?.high,
      publishTime: item?.snippet.publishedAt,
      description:item?.snippet.description,
      channelTitle:item?.channelTitle || "Netflix",
      statistics: item?.statistics || {viewCount:0},
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

export const getSpecificVideo = async(id) => {
const URL =  `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
return getReuestedVideos(URL);
 
}