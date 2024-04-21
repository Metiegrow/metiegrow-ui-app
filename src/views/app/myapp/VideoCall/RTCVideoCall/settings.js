import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYFjfv2cCUyq/b4B/sUvpmQr3hoilLunGRj+ipqbaP63x/KTAYJJqZmxukmiYmpKSYpJiZJBoZmCSlmRgamiclphqkZb0Y7pyWkMgI0Pw3MOMjAwQCOKzMKTnp+czMAAA9XEe/g==";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
