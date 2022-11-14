import { Card, Typography } from "@mui/material";

const MovieListCard = (props) => {
  const { user_id, movie_list, name, list_visibility } = props;
  return (
    <Card elevation={2} style={{'display':"flex",'flexDirection':'column',padding:'10px 20px 10px 20px'}}>
      <Typography fontSize={25}>
        {name}
        {movie_list.length}
      </Typography>
      <Typography>{"created by - " + user_id}</Typography>
      <Typography>{list_visibility}</Typography>
    </Card>
  );
};
export default MovieListCard;
