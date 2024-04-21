import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYHi3LvpKKj/Df/XHcUWf9qxTWGn19H7XB/ucPH6LntY1eqkKDCapZsbmJomGqSkpKSYpRgaJZgYmaUkGpobGaYmpFmlJpeaqaQ2BjAwvhQ8yMzJAIIjPwpCen57PwAAAnwYgNw==";
  

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
