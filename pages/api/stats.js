import {
  findVideoByUserId,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function Stats(req, res) {
  console.log(req.query);
  const token = req.cookies.token;

  try {
    if (token) {
      const videoId = req.query.videoId || req.body.videoId;
      const { favourited, watched = true } = req.body;
      if (videoId) {
        const decoded = await verifyToken(token);
        const userId = decoded.issuer;

        //Redirect in serverSide if something went wrong!!!//
       
        const doesStatsExsist = await findVideoByUserId(token, userId, videoId);

        const findUserVideos = doesStatsExsist.data.stats.length;
        console.log(findUserVideos);

        if (req.method === "POST") {
          if (findUserVideos) {
            //update
            const stats = await updateStats(token, {
              favourited,
              userId,
              watched,
              videoId,
            });
            res.send({ stats });
          } else {
            //add data
            const stats = await insertStats(token, {
              favourited: 1,
              userId,
              watched: true,
              videoId,
            });
            res.send({ stats });
          }
        } else {
          if (findUserVideos) {
            res.send(doesStatsExsist.data);
          } else {
            res.status(403).send({});
          }
        }
      }
    }
  } catch (err) {
    res.status(500).send({ done: false, error: err?.message });
  }
}
