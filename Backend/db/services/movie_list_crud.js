const { NOT_FOUND, SERVER_CRASH, SUCCESS } =
  require("../../utils/config").STATUS_CODES;
const MovieListModel = require("../models/movie_list");
module.exports = {
  createMovieList(movie_list_object) {
    const promise = MovieListModel.create(movie_list_object);
    return promise;
  },
  getAllPublicMovieList() {
    const promise = MovieListModel.find({ list_visibility: 'public' });
    return promise;
  },
  switchMovieListVisibility(user_id, list_name, visibility) {
    const promise = MovieListModel.updateOne(
      { user_id: user_id, name: list_name },
      { $set: { list_visibility: visibility } }
    );
    return promise;
  },
  getMyMovieList(user_id) {
    const promise = MovieListModel.find({ user_id: user_id });
    return promise;
  },
  async addToMovieList(user_id,list_name ,movie_id) {
    try {
      const promise = await MovieListModel.updateOne(
        { user_id: user_id ,name:list_name},
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
  async removeFromMovieList(user_id, list_name,movie_id) {
    try {
      const promise = await MovieListModel.updateOne(
        { user_id: user_id ,name:list_name},
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
  deleteList(user_id,list_name){
    const promise = MovieListModel.deleteOne({user_id:user_id,name:list_name});
    return promise;
  }
};
