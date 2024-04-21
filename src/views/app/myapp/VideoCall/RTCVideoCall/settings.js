import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYPCtDDR9FRyayn29hHeOYPN8qTWZGb27TGbezXTn+pG+pEOBwSTVzNjcJNEwNSUlxSTFyCDRzMAkLcnA1NA4LTHVIi1J9ZVKWkMgI8P82Z2sjAwQCOKzMKTnp+czMAAA3U0efg==";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
