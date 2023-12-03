import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getPlaylistTracks,
  reorderPlaylistTracks,
} from "../../services/tracks";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { getRandomNum } from "../../utils/getRandomNum";
import toast from "react-hot-toast";
import ConfirmDialogModal from "../../components/ConfirmDialogModal";
import Modal from "../../components/Modal";
import Lottie from "lottie-react";
import LottieDice from "../../assets/lottieDice.json";
import Checkmark from "../../components/Checkmark";

const Playlist = ({ playlist }) => {
  const [progress, setProgress] = useState({
    isShuffling: false,
    progress: 0,
  });
  const [confirmShuffleModal, setConfirmShuffleModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const getPlaylist = async (id) => {
    const res = await getPlaylistTracks(id);
    console.log(res);
    // window.open(playlist.external_urls.spotify, "_blank");
  };

  const shuffle = async (id, playlistName) => {
    setLoadingModal(true);
    const totalTracks = parseInt(playlist?.tracks?.total);

    setProgress({
      isShuffling: true,
      progress: 0,
    });
    for (let i = 0; i < totalTracks; i++) {
      await reorderPlaylistTracks(id, getRandomNum(totalTracks - 1), i);
      setProgress({
        isShuffling: true,
        progress: i,
      });
    }
    setProgress({
      isShuffling: true,
      progress: totalTracks,
    });
    setTimeout(
      () =>
        setProgress({
          isShuffling: false,
          progress: 0,
        }),
      250
    );
    setTimeout(() => setLoadingModal(false), 3000); //if user doesnt close the modal
  };

  useEffect(() => console.log(progress.progress), [progress]);
  return (
    <Grid item xs={12} md={4} paddingY={1}>
      <Box
        paddingX={1}
        paddingY={1}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        className="w-100"
        sx={{ cursor: "pointer" }}
      >
        <Tooltip title="Shuffle">
          <Button
            variant="contained"
            color={progress.isShuffling ? "info" : "highlight"}
            sx={{ height: 45 }}
            onClick={() => {
              setConfirmShuffleModal(true);
            }}
          >
            <ShuffleIcon sx={{ fontSize: 20 }} />
          </Button>
        </Tooltip>

        <Box display={"flex"} alignItems={"center"} gap={2}>
          {playlist?.images ? (
            <img src={playlist?.images[0]?.url} width={45} height={45} alt="" />
          ) : null}
          <Box display={"flex"} flexDirection={"column"}>
            <Typography>{playlist?.name}</Typography>
            <Typography color={"secondary.main"}>
              {playlist?.tracks?.total} tracks
            </Typography>
          </Box>
        </Box>

        <ConfirmDialogModal
          isModalOpen={confirmShuffleModal}
          setIsModalOpen={setConfirmShuffleModal}
          question={"The playlist will be shuffled"}
          action={() => shuffle(playlist?.id, playlist?.name)}
          icon={<ShuffleIcon color="#000" sx={{ fontSize: 90 }} />}
        />
      </Box>
      {/* {progress.isShuffling && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 4 }}>
          <Box sx={{ width: "100%" }}>
            <progress value={progress.progress} max={100} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">{`${Math.round(
              progress.progress
            )}%`}</Typography>
          </Box>
        </Box>
      )} */}
      <Modal isModalOpen={loadingModal} setIsModalOpen={setLoadingModal}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          height={300}
          width={300}
        >
          {progress.isShuffling ? (
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
                {progress.progress} out of {playlist?.tracks?.total} track(s)
                are shuffled!
              </Typography>
            </>
          ) : (
            <>
              <Checkmark size={100} />
              Shuffling is done!
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Playlist;
