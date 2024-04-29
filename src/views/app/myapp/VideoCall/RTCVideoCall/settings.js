import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYMh+miJ69OZChXu7hfamck9hFuitV33ZxNReGJkzre9JfLsCg0mqmbG5SaJhakpKikmKkUGimYFJWpKBqaFxWmKqRVrSUjP9tIZARgaW8ghmRgYIBPMZ0vPT8xkYAA0tHhE=";
  

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
