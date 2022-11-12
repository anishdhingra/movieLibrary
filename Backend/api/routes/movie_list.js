const express = require("express");
const router = express.Router();
const {
  addToMovieList,
  getAllPublicLMovieList,
  getMyMovieList,
  removeFromMovieList,
  switchMovieListVisibility,
  createList,
  deleteList,
} = require("../../controller/movie_list");
const {
  ADD_TO_MOVIE_LIST,
  GET_ALL_PUBLIC_MOVIE_LIST,
  GET_MY_MOVIE_LIST,
  REMOVE_FROM_MOVIE_LIST,
  SWITCH_MOVIE_LIST_VISIBILITY,
  CREATE_MOVIE_LIST,
  DELETE_MOVIE_LIST,
} = require("../../utils/config").ROUTES.MOVIE_LIST;
router.get(GET_ALL_PUBLIC_MOVIE_LIST, getAllPublicLMovieList);
router.get(GET_MY_MOVIE_LIST, getMyMovieList);
router.post(SWITCH_MOVIE_LIST_VISIBILITY, switchMovieListVisibility);
router.post(ADD_TO_MOVIE_LIST, addToMovieList);
router.post(REMOVE_FROM_MOVIE_LIST, removeFromMovieList);
router.post(CREATE_MOVIE_LIST, createList);
router.post(DELETE_MOVIE_LIST, deleteList);
module.exports = router;
