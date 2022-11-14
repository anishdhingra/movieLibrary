import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import BootstrapButton from "./BootstrapButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function MyAppBar({ searchMovies }) {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  function moveToMyList() {
    navigate(Constants.ROUTES.MY_MOVIE_LIST);
  }
  function moveToPublicList() {
    navigate(Constants.ROUTES.PUBLIC_MOVIE_LIST);
  }
  function handleChange(e) {
    setSearchString(e.target.value);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search sx={{ ml: 40 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ minWidth: 500 }}
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <BootstrapButton
            sx={{ ml: 1 }}
            variant="contained"
            disableRipple
            onClick={() => {
              searchMovies(searchString);
            }}
          >
            Search
          </BootstrapButton>
          <Box onClick={moveToPublicList}>
            <LanguageIcon
              sx={{ cursor: "pointer", ml: "45vw", fontSize: 30 }}
            />
          </Box>
          <BootstrapButton
            sx={{ ml: 5 }}
            variant="contained"
            disableRipple
            onClick={moveToMyList}
          >
            My List
          </BootstrapButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
