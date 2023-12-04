import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useUser from "../contexts/user/useUser";
import { SPOTIFY_AUTH_LINK, getCrrUser, getPlaylists } from "../services/user";
import { setAccessToken } from "../api/axiosConfig";
import Loader from "../components/Loader";
import Landing from "../components/Landing";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "../assets/logo.svg";

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();
  const isSmScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (user?.id) {
      setTimeout(() => setIsLoading(false), 3000);
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
        paddingX={2}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo} width="44" alt="logo" />
          <Typography color={"primary.main"} fontSize={20}>
            {!isSmScreen ? "Spotify Playlist Shuffler" : "Shuffler"}
          </Typography>
        </Box>
        {isLoading ? null : user?.id ? (
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            gap={1}
            sx={{
              backgroundColor: "#333333",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                backgroundColor: "#33333390",
              },
            }}
          >
            {/* <Link
              href={user?.external_urls?.spotify}
              target="_blank"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            > */}
            <img
              src={user?.images[1].url}
              width={32}
              height={32}
              style={{ borderRadius: "4px" }}
            />
            {isSmScreen ? null : (
              <Typography fontSize={14} color={"#fff"} textTransform={"none"}>
                {user?.display_name}
              </Typography>
            )}

            {anchorEl ? (
              <ArrowDropUpIcon sx={{ color: "#fff" }} />
            ) : (
              <ArrowDropDownIcon sx={{ color: "#fff" }} />
            )}

            {/* </Link> */}
          </Button>
        ) : // </Link>
        null}
      </Box>

      <Popover
        id={anchorEl ? "simple-popover" : undefined}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="dark-bg" style={{ width: "100%", height: "100%" }}>
          <List
            className="dark-bg"
            sx={{
              padding: 0,
              backgroundColor: "#333333",
              borderRadius: 0,
            }}
          >
            <ListItemButton
              disablePadding
              sx={{
                paddingX: 1.6,
                paddingY: 1,
                "&:hover": {
                  backgroundColor: "#404040",
                },
              }}
            >
              <Link
                href={user?.external_urls?.spotify}
                target="_blank"
                underline="none"
                display={"flex"}
                alignItems={"center"}
              >
                <ListItemIcon>
                  <PersonIcon
                    sx={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ color: "white.main" }}>
                  Visit Profile
                </ListItemText>
              </Link>
            </ListItemButton>
            <ListItemButton
              disablePadding
              sx={{
                paddingX: 1.6,
                paddingY: 1,
                borderBottomWidth: 3,
                borderBottom: "#fff",
                "&:hover": {
                  backgroundColor: "#404040",
                },
              }}
            >
              <Link
                href={"https://h-solak.github.io"}
                target="_blank"
                underline="none"
                display={"flex"}
                alignItems={"center"}
              >
                <ListItemIcon>
                  <GitHubIcon
                    sx={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ color: "white.main" }}>
                  Developer
                </ListItemText>
              </Link>
            </ListItemButton>
            <ListItemButton
              disablePadding
              sx={{
                borderTop: 2,
                borderTopColor: "#ffffff10",
                paddingX: 1.6,
                paddingY: 1,
                "&:hover": {
                  backgroundColor: "#404040",
                },
              }}
              onClick={() => {
                setAnchorEl(null);
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
              <ListItemIcon>
                <LogoutIcon
                  sx={{
                    fontSize: 18,
                    color: "#fff",
                  }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: "white.main" }}>Logout</ListItemText>
            </ListItemButton>
          </List>
        </div>
      </Popover>

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
