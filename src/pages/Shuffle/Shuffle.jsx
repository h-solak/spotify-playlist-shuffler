import React from "react";
import Layout from "../../layout/Layout";
import useUser from "../../contexts/user/useUser";
import Playlist from "../Shuffle/Playlist";
import { Button, Grid, Typography } from "@mui/material";
import { addItemsToPlaylist } from "../../services/tracks";

const Shuffle = () => {
  const { user } = useUser();

  return (
    <Layout>
      <main>
        <Typography fontWeight={600}>Shuffle</Typography>
        <Typography color={"secondary.main"} style={{ fontSize: 14 }}>
          Playlist should contain less than 100 songs for it to be shuffled
          correctly!
        </Typography>

        <Grid container>
          {user?.playlists?.items.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
        </Grid>
      </main>
    </Layout>
  );
};

export default Shuffle;
