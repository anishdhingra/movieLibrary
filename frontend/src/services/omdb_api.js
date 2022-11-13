import axios from "axios";
const omdb_api = {
  async getMovieByName(name, page = 1) {
    try {
      const promise = await axios.get(
        process.env.REACT_APP_OMDB_API_URL +
          "?apiKey=" +
          process.env.REACT_APP_OMDB_API_KEY +
          "&s=" +
          name +
          "&page=" +
          page
      );
      return promise;
    } catch (error) {
      console.log("error is ", error);
    }
  },
  async getMovieById(id) {
    try {
      const promise = await axios.get(
        process.env.REACT_APP_OMDB_API_URL +
          "?apiKey=" +
          process.env.REACT_APP_OMDB_API_KEY +
          "&i=" +
          id
      );
      return promise;
    } catch (error) {
      console.log("error is", error);
    }
  },
};
export default omdb_api;
