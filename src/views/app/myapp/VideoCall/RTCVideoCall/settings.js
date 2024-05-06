import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
// const token =
//   "0064e6374a1eddd4d20a604fb0513fae8fbIAAZykswKKEI2Y1qDUtXXnniTrssT5UJoTcO5snziqLZ6U8CiV63SH0QIgB86VDgxGM6ZgQAAQDEYzpmAgDEYzpmAwDEYzpmBADEYzpm"
  

export const config = { mode: "rtc", codec: "vp8", appId };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
// export const channelName = "7d72365eb983485397e3e3f9d460bdda";