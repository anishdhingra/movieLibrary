const { NOT_FOUND, SERVER_CRASH, SUCCESS } =
  require("../../utils/config").STATUS_CODES;
const MovieListModel = require("../models/movie_list");
module.exports = {
  createMovieList(movie_list_object) {
    const promise = MovieListModel.create(movie_list_object);
    return promise;
  },
  getAllPublicMovieList() {
    const promise = MovieListModel.find({ isPrivate: false });
    return promise;
  },
  switchMovieListVisibility(user_id, visibility) {
    const promise = MovieListModel.updateOne(
      { user_id: user_id },
      { $set: { isPrivate: visibility } }
    );
    return promise;
  },
  getMyMovieList(user_id) {
    const promise = MovieListModel.findOne({ user_id: user_id });
    return promise;
  },
  async addToMovieList(user_id, movie_id) {
    try {
      const promise = await MovieListModel.updateOne(
        { user_id: user_id },
        { $addToSet: { movie_list: movie_id } }
      );
      if (promise.modifiedCount == 1) {
        return { status: SUCCESS, response: "movie added to the list" };
      } else if (promise.modifiedCount == 0) {
        return {
          status: SERVER_CRASH,
          response: "movie already added to the list",
        };
      } else {
        return { status: NOT_FOUND, response: "user not found" };
      }
    } catch (error) {
      return { status: SERVER_CRASH, response: error.toString() };
    }
  },
  async removeFromMovieList(user_id, movie_id) {
    try {
      const promise = await MovieListModel.updateOne(
        { user_id: user_id },
        { $pull: { movie_list: movie_id } }
      );
      if (promise.modifiedCount == 1) {
        return { status: SUCCESS, response: "movie removed from the list" };
      } else if (promise.modifiedCount == 0 && promise.matchedCount == 1) {
        return {
          status: SERVER_CRASH,
          response: "movie not found in the list",
        };
      } else {
        return { status: NOT_FOUND, response: "user not found" };
      }
    } catch (error) {
      return { status: SERVER_CRASH, response: error.toString() };
    }
  },
};
