//  api/index.ts
import userApi from "./user-api";
import adminChallengeApi from "./admin-challenge-api";
import challengeApi from "./challenge-api.ts"

const api = {
  ...userApi,
  ...adminChallengeApi,
  ...challengeApi
};

export default api;
