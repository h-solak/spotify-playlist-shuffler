import axios from "axios";

const spotifyApiBaseAxios = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
  },
});

const projectApiBaseAxios = axios.create({
  baseURL:
    "http://localhost:8800/api" || "https://tunemix-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("h-solak-spotify-playlist-shuffler", token);
    spotifyApiBaseAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    removeAccessToken();
  }
};

const removeAccessToken = () => {
  localStorage.removeItem("h-solak-spotify-playlist-shuffler");
  delete spotifyApiBaseAxios.defaults.headers.common["Authorization"];
};

const accessToken = localStorage.getItem("h-solak-spotify-playlist-shuffler");

if (accessToken) {
  setAccessToken(accessToken);
}

export {
  spotifyApiBaseAxios,
  projectApiBaseAxios,
  setAccessToken,
  removeAccessToken,
};
