import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYPj0edPPx+Vf7avEFpQ3GNz5tuitwaTXT6Kj/Fe6xZwo3T1dgcEk1czY3CTRMDUlJcUkxcgg0czAJC3JwNTQOC0x1SItaX2iWlpDICODypkIZkYGCATxWRjS89PzGRgAkzMjBw==";
  

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
