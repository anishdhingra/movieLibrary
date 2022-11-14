import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import movieListServices from "../services/movie_list";
import MovieListCard from "../components/MovieListCard";
const PublicMovieList = () => {
  const [publicMovieList, setPublicMovieList] = useState([]);
  async function getMovieListData() {
    const data = await movieListServices.getPublicMovieList();
    if (data.movie_list) {
      setPublicMovieList(data.movie_list);
    }
  }
  useEffect(() => {
    getMovieListData();
  }, []);
  return (
    <Box>
      <Typography fontSize={40} >
        Public Movie Lists
      </Typography>
      <Grid container style={{marginLeft:'100px',marginTop:'20px'}}>
        {publicMovieList.map((movie_list, index) => (
          <Grid item xs={2}>
            <MovieListCard
              movie_list={movie_list.movie_list}
              user_id={movie_list.user_id}
              name={movie_list.name}
              list_visibility={movie_list.list_visibility}
            ></MovieListCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default PublicMovieList;
