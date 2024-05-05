import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4e6374a1eddd4d20a604fb0513fae8fb";
const token =
  "007eJxTYFgTv+R09PWFEfF8397JfFwYvvjEB3+X9VN5/7SE8u8q5tupwGCSamZsbpJomJqSkmKSYmSQaGZgkpZkYGponJaYapGWpMNlltYQyMiQ2ODFwsgAgSA+C0N6fno+AwMAvEwf7g==";
  

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "gogo";
