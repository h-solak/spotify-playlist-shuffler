import {
  Box,
  Button,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useUser from "../contexts/user/useUser";
import { SPOTIFY_AUTH_LINK, getCrrUser, getPlaylists } from "../services/user";
import { setAccessToken } from "../api/axiosConfig";
import Loader from "../components/Loader";
import Landing from "../components/Landing";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../assets/logo.svg";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user?.id) {
      setIsLoading(false);
    } else {
      checkUser();
    }
  }, []);

  const checkUser = async () => {
    const hash = window.location.hash;
    let token = localStorage.getItem("h-solak-spotify-playlist-shuffler");

    if (hash) {
      setAccessToken(clearHash(hash));
      const newUser = await getCrrUser();
      if (newUser?.id) {
        const playlists = await getPlaylists(newUser?.id);
        setUser({
          ...newUser,
          token: clearHash(hash),
          playlists: playlists,
        });
        console.log(playlists);
      }
    } else if (token && !hash) {
      const newUser = await getCrrUser();
      if (newUser?.id) {
        const playlists = await getPlaylists(newUser?.id);
        setUser({
          ...newUser,
          token: token,
          playlists: playlists,
        });
        console.log(playlists);
      }
    }

    setIsLoading(false);
  };

  const clearHash = (hash) => {
    return hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
  };

  return (
    <div>
      {/* Navbar */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={70}
        width={"100%"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo} width="44" alt="logo" />
          <Typography color={"primary.main"} fontSize={20}>
            Spotify Playlist Shuffler
          </Typography>
        </Box>
        {isLoading ? null : user?.id ? (
          // <Link
          //   href={user?.external_urls?.spotify}
          //   target="_blank"
          //   underline="none"
          // >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <img
              src={user?.images[1].url}
              width={32}
              height={32}
              style={{ borderRadius: "4px" }}
            />
            <Typography fontSize={14}>{user?.display_name}</Typography>
            <Tooltip title="Logout">
              <IconButton
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  setUser({});
                  localStorage.removeItem("h-solak-spotify-playlist-shuffler");
                  window.history.pushState(
                    "object or string",
                    "Title",
                    "/" +
                      window.location.href
                        .substring(window.location.href.lastIndexOf("/") + 1)
                        .split("?")[0]
                  );
                }}
              >
                <LogoutIcon
                  sx={{
                    fontSize: 16,
                    color: "#fff",
                    background: "#950101",
                    borderRadius: 2,
                    padding: 1,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        ) : // </Link>
        null}
      </Box>

      {/* Body */}
      {isLoading ? (
        <Loader className={"absolute-center"} />
      ) : user?.id ? (
        <div>{children}</div>
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Layout;
