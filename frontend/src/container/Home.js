import { Box, Grid } from "@mui/material";
import MyAppBar from "../components/Appbar";
import MyCarousel from "../components/Carousel";
import MyCard from "../components/MyCard";
import { useState } from "react";
import omdb_api from '../services/omdb_api'

const Home = () => {
  const top_movie_list = [
    {
      imdbID: "tt0325980",
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      Year: "2003",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt4154664",
      Title: "Captain Marvel",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
    },
    {
      imdbID: "tt12361974",
      Title: "Zack Snyder's Justice League",
      Year: "2021",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYjI3NDg0ZTEtMDEwYS00YWMyLThjYjktMTNlM2NmYjc1OGRiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
    },
    {
      imdbID: "tt6443346",
      Title: "Black Adam",
      Year: "2022",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt2631186",
      Title: "Baahubali: The Beginning",
      Year: "2015",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWVlMjVhZWYtNWViNC00ODFkLTk1MmItYjU1MDY5ZDdhMTU3XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1130884",
      Title: "Shutter Island",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt7838252",
      Title: "K.G.F: Chapter 1",
      Year: "2018",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZDNlNzBjMGUtYTA0Yy00OTI2LWJmZjMtODliYmUyYTI0OGFmXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1285016",
      Title: "The Social Network",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
  ];
  const [movies, setMovies] = useState(top_movie_list);
  const searchMovies = async(searchString)=>{
    const response = await omdb_api.getMovieByName(searchString);
    if(response.data.Search.length>0)
    setMovies(response.data.Search);
  };
  return (
    <>
      <MyAppBar searchMovies={searchMovies}></MyAppBar>
      {movies[0].Type!==undefined?<></>:<MyCarousel></MyCarousel>}
      <Box mt={2} ml={5}>
        <Grid container>
          {movies.map((movie, index) => (
            <Grid key={index} item xs={2.2} m={1}>
              <MyCard movie={movie}></MyCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default Home;
