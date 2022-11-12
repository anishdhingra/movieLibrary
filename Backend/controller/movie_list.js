const { SUCCESS, SERVER_CRASH, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const movieListOperations = require("../db/services/movie_list_crud");
const jwt = require("../utils/token");
const movieListController = {
  createList() {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const list_name = request.body.list_name;
    const list_visibility = request.body.list_visibility;
    const promise = movieListOperations.createMovieList({
      user_id: user.user_id,
      list_visibility: list_visibility,
      list_name: list_name,
      movie_list: [],
    });
    promise
      .then((data) =>
        response.status(SUCCESS).json({
          status: messageBundle.successful,
          doc: data,
        })
      )
      .catch((error) =>
        response
          .status(SERVER_CRASH)
          .json({ status: messageBundle.unsuccessful, error: error })
      );
  },
  getAllPublicLMovieList(request, response) {
    const promise = movieListOperations.getAllPublicMovieList();
    promise
      .then((data) =>
        response
          .status(SUCCESS)
          .json({ status: messageBundle.successful, movie_list: data })
      )
      .catch((error) =>
        response
          .status(SERVER_CRASH)
          .json({ status: messageBundle.unsuccessful, error: error })
      );
  },
  switchMovieListVisibility(request, response) {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const promise = movieListOperations.switchMovieListVisibility(
      user.user_id,
      request.body.list_name,
      request.body.visibility
    );
    promise
      .then((data) =>
        response.status(SUCCESS).json({
          status: messageBundle.successful,
          message: "Your movie list visibility has been changed to",
        })
      )
      .catch((error) =>
        response
          .status(SERVER_CRASH)
          .json({ status: messageBundle.unsuccessful, error: error })
      );
  },
  getMyMovieList(request, response) {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const promise = movieListOperations.getMyMovieList(user.user_id);
    promise
      .then((data) =>
        response.status(SUCCESS).json({
          status: messageBundle.successful,
          movie_list: data,
        })
      )
      .catch((error) =>
        response
          .status(SERVER_CRASH)
          .json({ status: messageBundle.unsuccessful, error: error })
      );
  },
  async addToMovieList(request, response) {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const promise = await movieListOperations.addToMovieList(
      user.user_id,
      request.body.list_name,
      request.body.movie_id
    );
    if (promise.status == SUCCESS) {
      response.status(SUCCESS).json({
        status: messageBundle["update.successful"],
        message: promise.response,
      });
    } else if (promise.status == SERVER_CRASH) {
      response.status(SERVER_CRASH).json({
        status: messageBundle["update.unsuccessful"],
        message: promise.response,
      });
    } else {
      response.status(SERVER_CRASH).json({
        status: messageBundle["UNsuccessful"],
        message: promise.response,
      });
    }
  },
  async removeFromMovieList(request, response) {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const promise = await movieListOperations.addToMovieList(
      user.user_id,
      request.bosy.list_name,
      request.body.movie_id
    );
    if (promise.status == SUCCESS) {
      response.status(SUCCESS).json({
        status: messageBundle["update.successful"],
        message: promise.response,
      });
    } else if (promise.status == SERVER_CRASH) {
      response.status(SERVER_CRASH).json({
        status: messageBundle["update.unsuccessful"],
        message: promise.response,
      });
    } else {
      response.status(SERVER_CRASH).json({
        status: messageBundle["UNsuccessful"],
        message: promise.response,
      });
    }
  },
  deleteList(request, response) {
    var token = request.headers["authorization"];
    var user = jwt.getdoc(token);
    const list_name = request.body.list_name;
    const promise = movieListOperations.deleteList(user.user_id, list_name);
    promise
      .then((data) =>
        response.status(SUCCESS).json({
          status: messageBundle.successful,
        })
      )
      .catch((error) =>
        response
          .status(SERVER_CRASH)
          .json({ status: messageBundle.unsuccessful, error: error })
      );
  },
};
module.exports = movieListController;
