import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYLg2nUt3auaBxZsv74mtipHdK2W6+nLY4pCiFxMdVmhJ5a9QYDBJNTM2N0k0TE1JSTFJMTJINDMwSUsyMDU0TktMtUhLEpZUSmsIZGQwOP2SiZEBAkF8Fob0/PR8BgYASlwfEQ==";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
