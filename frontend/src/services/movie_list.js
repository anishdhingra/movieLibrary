import { ApiClient } from "../utils/api_client";
import { Constants } from "../utils/constants";
const movieListServices = {
  async getPublicMovieList() {
    const response = await ApiClient.get(
      Constants.API_ROUTES.GET_PUBLIC_MOVIE_LIST
    );
    if (response.status === Constants.STATUS_CODES.SUCCESS) {
      return { status: true, movie_list: response.data.movie_list };
    } else {
      return { status: false, error: response.data.error };
    }
  },
  async getMyMovieList() {
    const response = await ApiClient.get(
      Constants.API_ROUTES.GET_MY_MOVIE_LIST
    );
    if (response.status === Constants.STATUS_CODES.SUCCESS) {
      return { status: true, movie_list: response.data.movie_list };
    } else {
      return { status: false, error: response.data.error };
    }
  },
};
export default movieListServices;
