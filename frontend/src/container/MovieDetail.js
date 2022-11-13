import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MyAppBar from "../components/Appbar";
import omdb_api from "../services/omdb_api";
import { styled } from "@mui/material/styles";

const MovieDetail = () => {
  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  const search_params = new URLSearchParams(useLocation().search);
  const movie_id = search_params.get("movie_id");
  const [movie, setMovie] = useState({});
  async function getMovieDetails() {
    const response = await omdb_api.getMovieById(movie_id);
    console.log(response);
    setMovie(response.data);
  }
  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <>
      <MyAppBar></MyAppBar>
      {movie.Title !== undefined ? (
        <Box sx={{ mt: 5, ml: 20 }}>
          <Grid container xs>
            <Grid item xs={4}>
              <img src={movie.Poster === "N/A" ? "./Images/default-img.jpg" : movie.Poster} alt="Logo" />
            </Grid>
            <Grid item xs={6.5}>
              <Box>
                <Typography sx={{ fontSize: 40 }}>{movie.Title}</Typography>
                <Typography>{"Released : " + movie.Released}</Typography>
                <Typography>{"Genre : " + movie.Genre}</Typography>
                <Typography>{"Director : " + movie.Director}</Typography>
                <Typography>{"Actors : " + movie.Actors}</Typography>
                <Typography>{"Plot : " + movie.Plot}</Typography>
                <Typography>{"Awards : " + movie.Awards}</Typography>
                <Typography>{"BoxOffice : " + movie.BoxOffice}</Typography>
                <Typography>{"Imdb Votes : " + movie.imdbVotes}</Typography>
                <Typography>{"Imdb Rating : " + movie.imdbRating}</Typography>
              </Box>
              <BootstrapButton
                sx={{ mt: 5 }}
                variant="contained"
                disableRipple
                onClick={() => {}}
              >
                Add to My List
              </BootstrapButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
export default MovieDetail;
