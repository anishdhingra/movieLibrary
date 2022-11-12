import "../App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";

const Welcome = () => {
  const navigate = useNavigate();
  const navigateTo = (Route) => {
    navigate(Route);
  };
  return (
    <div className="welcome-bg full-height">
      <Button
        onClick={() => {
          navigateTo(Constants.ROUTES.LOGIN);
        }}
        variant="contained"
      >
        Sign In
      </Button>
      <Button
        onClick={() => {
          navigateTo(Constants.ROUTES.REGISTER);
        }}
        variant="outlined"
      >
        Sign Up
      </Button>
    </div>
  );
};
export default Welcome;
