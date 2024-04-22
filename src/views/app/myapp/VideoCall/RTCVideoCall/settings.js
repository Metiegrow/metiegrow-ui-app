import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYCgSFqwR9+7uqp7/+G/5/Pzfb5daXsjcL8+xuJLTqUL1VJgCg0mqmbG5SaJhakpKikmKkUGimYFJWpKBqaFxWmKqRVrS+ZeqaQ2BjAzH/jezMDJAIIjPwpCen57PwAAAULEgew==";
  

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
