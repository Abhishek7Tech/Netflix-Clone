import Jwt from "jsonwebtoken";
import {
  findVideoByUserId,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";

export default async function Stats(req, res) {
  console.log(req.query);
  const token = req.cookies.token;

  try {
    if (token) {
      const videoId = req.query.videoId || req.body.videoId;
      const { favourited, watched = true } = req.body;
      if (videoId) {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const userId = decoded.issuer;

        const doesStatsExsist = await findVideoByUserId(
          token,
          userId,
          videoId
        );

        const findUserVideos = doesStatsExsist.data.stats.length;
        console.log(findUserVideos);

        if (req.method === "POST") {
          if (findUserVideos) {
            //update
            const stats = await updateStats(token, {
              favourited,
              userId,
              watched,
              videoId: "b9EkMc79ZSU",
            });
            res.send({ stats });
          } else {
            //add data
            const stats = await insertStats(token, {
              favourited: 1,
              userId,
              watched: true,
              videoId: "mYfJxlgR2jw",
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
