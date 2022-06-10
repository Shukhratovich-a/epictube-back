import path from "path";
import { read, write } from "../utils/model.js";
import { InternalServerError, AuthorizationError } from "../utils/errors.js";

const GET = (req, res, next) => {
  try {
    let videos = read("videos");
    let users = read("users");

    let { userId, search } = req.query;

    if (req.url == "/admin/videos") userId = req.userId;

    let data = videos.filter((video) => {
      let byUserId = userId ? video.userId == userId : true;
      let bySearch = search ? video.title.toLowerCase().includes(search.toLowerCase()) : true;

      video.user = users.find((user) => user.userId == video.userId);

      delete video.userId;
      delete video.user.password;

      return byUserId && bySearch;
    });

    res.status(200).send(data);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default { GET };
