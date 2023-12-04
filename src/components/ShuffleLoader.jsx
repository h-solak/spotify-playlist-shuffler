import React from "react";
import Lottie from "lottie-react";
import LottieDice from "../assets/lottieDice.json";
import { Typography } from "@mui/material";

const ShuffleLoader = ({ progress, totalTracks }) => {
  return (
    <>
      <Lottie
        animationData={LottieDice}
        loop={true}
        style={{
          height: 150,
          width: 150,
        }}
      />
      <Typography textAlign={"center"} fontSize={18}>
        Wait, we are getting there!
      </Typography>
      <Typography textAlign={"center"} color={"secondary.main"}>
        {progress} out of {totalTracks} track(s) are shuffled!
      </Typography>
    </>
  );
};

export default ShuffleLoader;
