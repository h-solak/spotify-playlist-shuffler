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
import Checkmark from "../../components/Checkmark";
import ShuffleLoader from "../../components/ShuffleLoader";
import StopIcon from "@mui/icons-material/Stop";

const Playlist = ({ playlist }) => {
  const [progress, setProgress] = useState({
    isShuffling: false,
    progress: 0,
    stopAction: false,
  });
  const [confirmShuffleModal, setConfirmShuffleModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const getPlaylist = async (id) => {
    const res = await getPlaylistTracks(id);
    console.log(res);
    // window.open(playlist.external_urls.spotify, "_blank");
  };

  const shuffle = async (id) => {
    setLoadingModal(true);
    setProgress({
      isShuffling: true,
      progress: 0,
      stopAction: false,
    });
    const totalTracks = parseInt(playlist?.tracks?.total);
    for (let i = 0; i < totalTracks; i++) {
      if (!progress.stopAction) {
        console.log("nası", progress.stopAction);
        await reorderPlaylistTracks(id, getRandomNum(totalTracks - 1), i);
        setProgress((oldProgress) => ({
          ...oldProgress,
          progress: i,
        }));
      }
    }
    setProgress((oldProgress) => ({
      ...oldProgress,
      isShuffling: true,
      progress: totalTracks,
    }));
    setTimeout(resetProgress, 250);
    setTimeout(() => setLoadingModal(false), 3000); //if user doesnt close the modal
  };

  const resetProgress = () =>
    setProgress({
      isShuffling: false,
      progress: 0,
      stopAction: false,
    });
  useEffect(() => console.log(progress.stopAction), [progress.stopAction]);
  // useEffect(() => {
  //   if (progress.stopAction) {
  //     resetProgress();
  //   }
  // }, [progress.stopAction]);
  return (
    <Grid item xs={12} sm={6} md={4} paddingY={0.4}>
      <Box
        paddingY={1}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        className="w-100"
        sx={{ cursor: "pointer" }}
      >
        <Tooltip title={progress.isShuffling ? "Stop Shuffling" : "Shuffle"}>
          <Button
            variant="contained"
            color={progress.isShuffling ? "error" : "highlight"}
            sx={{ height: 45 }}
            onClick={
              progress.isShuffling
                ? () =>
                    setProgress({
                      isShuffling: false,
                      progress: 0,
                      stopAction: true,
                    })
                : () => {
                    setConfirmShuffleModal(true);
                  }
            }
          >
            {progress.isShuffling ? (
              <StopIcon sx={{ fontSize: 20 }} />
            ) : (
              <ShuffleIcon sx={{ fontSize: 20 }} />
            )}
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
            <ShuffleLoader
              progress={progress.progress}
              totalTracks={playlist?.tracks?.total}
            />
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
