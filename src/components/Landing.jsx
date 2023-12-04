import React from "react";
import { SPOTIFY_AUTH_LINK } from "../services/user";
import { Box, Button, Typography, Link, useMediaQuery } from "@mui/material";
import SpotifyLogo from "../assets/spotify.svg";
import UndrawMusicSvg from "../assets/undrawMusic.svg";

const Landing = () => {
  const isSmScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      className="absolute-center"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <img src={UndrawMusicSvg} width={250} />
      <Typography textAlign={"center"}>
        Shuffle your Spotify playlists easily for a fresh musical experience.
      </Typography>
      <Link href={SPOTIFY_AUTH_LINK} underline="none">
        <Button
          variant="outlined"
          startIcon={<img src={SpotifyLogo} width={20} />}
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>
            Login {!isSmScreen ? " to your account" : null}
          </Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default Landing;
