import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYJh1cNXTOZonZ7jXebXe+7/5VLH+he3ND5QFOhj8pIPPvjqkwGCSamZsbpJomJqSkmKSYmSQaGZgkpZkYGponJaYapGW9G+WTFpDICPDonOzmBkZIBDEZ2FIz0/PZ2AAABveInw=";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
