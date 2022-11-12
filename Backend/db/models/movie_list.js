const { Schema, SchemaTypes } = require("../connect");
const { MOVIE_LIST } = require("../../utils/config").SCHEMAS;
const mongoose = require("../connect");
const movieListSchema = new Schema(
  {
    name: { type: SchemaTypes.String, required: true, unique: true },
    user_id: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
      index: true,
    },
    movie_list: { type: SchemaTypes.Array, required: true },
    list_visibility: { type: SchemaTypes.String, required: true },
  },
  {
    timestamps: true, //this will add time in data object when the user is created in database
  }
);
const MovieListModel = mongoose.model(MOVIE_LIST, movieListSchema);
module.exports = MovieListModel;
