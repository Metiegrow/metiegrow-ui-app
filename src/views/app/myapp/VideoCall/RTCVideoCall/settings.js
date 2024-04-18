import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYODmapt053l24MIFJjaTFv7LXqr8/59cY9kUWUEjLkXHtUUKDCapZsbmJomGqSkpKSYpRgaJZgYmaUkGpobGaYmpFmlJ7/UU0hoCGRlSOc2ZGBkgEMRnYUjPT89nYAAA6Bkddw==";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
