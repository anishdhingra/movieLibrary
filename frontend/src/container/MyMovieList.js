import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import movieListServices from "../services/movie_list";
import PopoverPopupState from "../components/PopupForm";
import MovieListCard from "../components/MovieListCard";
const MyMovieList = () => {
  const [myMovieList, setMyMovieList] = useState([]);
  async function getMyMovieList() {
    const response = await movieListServices.getMyMovieList();
    if (response.movie_list) setMyMovieList(response.movie_list);
  }
  useEffect(() => {
    getMyMovieList();
  }, []);

  return (
    <>
      <Box>
        <Grid container mt={2}>
          <Grid
            m={"auto"}
            item
            xs={10}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography fontSize={40}>My Movie List</Typography>
            </Box>
            <Box mt={1}><PopoverPopupState/></Box>
          </Grid>
          <Grid item xs={10} style={{ marginLeft: "100px", marginTop: "20px" }}>
            {myMovieList.map((movie_list, index) => (
              <Grid item xs={3}>
                <MovieListCard
                  movie_list={movie_list.movie_list}
                  user_id={movie_list.user_id}
                  name={movie_list.name}
                  list_visibility={movie_list.list_visibility}
                ></MovieListCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default MyMovieList;
