import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";

export default function MyCard(props) {
  const { imdbID, Title, Poster, Year } = props.movie;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(Constants.ROUTES.MOVIE_DETAIL + "?movie_id=" + imdbID);
  };
  return (
    <Card sx={{ minHeight: 540 }} onClick={handleClick}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={Poster === "N/A" ? "./Images/default-img.jpg" : Poster}
        sx={{ cursor: "pointer", maxHeight: 400 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Title.length > 20 ? Title.substring(0, 16) + "..." : Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Add To My List</Button>
      </CardActions>
    </Card>
  );
}
