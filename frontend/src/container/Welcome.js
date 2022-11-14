import "../App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();
  const navigateTo = (Route) => {
    navigate(Route);
  };
  useEffect(() => {
    const current_time = new Date();
    const time = localStorage.getItem("time_stamp");
    console.log(time);
    const last_time = new Date(time);
    if (
      current_time.getTime() - last_time.getTime() >
      1000 * 60 * 60 * 24
    ) {
      console.log(current_time.getTime() - last_time.getTime())
      navigateTo(Constants.ROUTES.HOME);
    }
  }, []);
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
