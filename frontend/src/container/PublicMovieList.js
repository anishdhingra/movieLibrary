import { Box, Card, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import movieListServices from "../services/movie_list";
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
      <Typography fontSize={40} m={5}>
        Public Movie Lists
      </Typography>
      <Grid container>
        {publicMovieList.map((movie_list, index) => {
          <Grid item xs={4}>
            <Card elevation={2}>
              <Typography>
                {movie_list.user_id}
                {movie_list}
              </Typography>
              <Typography>{"created by - " + movie_list.user_id}</Typography>
            </Card>
          </Grid>;
        })}
      </Grid>
    </Box>
  );
};
export default PublicMovieList;
