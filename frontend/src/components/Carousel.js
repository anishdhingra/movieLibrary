import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  { img: "./Images/slider-1.jpg" ,trailer:"https://www.youtube.com/watch?v=d9MyW72ELq0"},
  { img: "./Images/slider-2.jpg"  ,trailer:"https://www.youtube.com/watch?v=sGbxmsDFVnE"},
  { img: "./Images/slider-3.jpg"  ,trailer:"https://www.youtube.com/watch?v=5iaYLCiq5RM"},
  { img: "./Images/slider-4.png"  ,trailer:"https://www.youtube.com/watch?v=aWzlQ2N6qqg"},
];

function MyCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleClick = (index) => {
    var win = window.open(images[index].trailer, '_blank');
    win.focus();
  };

  return (
    <Box sx={{ cursor:'pointer', flexGrow: 1, maxWidth: "90vw", m: "auto", mt: 2 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((img, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                onClick={
                  ()=>handleClick(index)
                }
                component="img"
                sx={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={img.img}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default MyCarousel;
