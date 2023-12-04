import React from "react";
import Layout from "../../layout/Layout";
import useUser from "../../contexts/user/useUser";
import Playlist from "../Shuffle/Playlist";
import { Box, Button, Grid, Typography } from "@mui/material";
import { addItemsToPlaylist } from "../../services/tracks";

const Shuffle = () => {
  const { user } = useUser();

  return (
    <Layout>
      <Box paddingX={2}>
        <Grid container>
          <Grid item md={6}>
            <Typography color={"white.main"} style={{ fontSize: 16 }}>
              Shuffle your Spotify playlists for a fresh musical experience.
              Rediscover your favorites with just a click. Start shuffling now!
            </Typography>
          </Grid>
        </Grid>

        <Grid container marginTop={1}>
          {user?.playlists?.items.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Shuffle;
