import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "585ca9e5cc3ef85d5562160a731c9415",
    language: "ko-KR",
  },
});

export default instance;
