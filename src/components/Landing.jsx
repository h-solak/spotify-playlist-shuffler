import React from "react";
import { SPOTIFY_AUTH_LINK } from "../services/user";
import { Box, Button, Typography, Link } from "@mui/material";
import SpotifyLogo from "../assets/spotify.svg";

const Landing = () => {
  return (
    <Box
      className="absolute-center"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={1}
    >
      <Typography>Start shuffling!</Typography>
      <Link href={SPOTIFY_AUTH_LINK} underline="none">
        <Button
          variant="outlined"
          startIcon={<img src={SpotifyLogo} width={20} />}
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>Login to your account</Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default Landing;
