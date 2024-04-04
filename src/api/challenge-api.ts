//  api/challenge-api.ts
import { Request } from "@/api/axios/request";

const challengeApi = {
  // 用户挑战管理列表查询
  getChallenges: (params: object) => Request.get(`/v1/challenges`, params),
  // 用户挑战管理列表查询
  getChallengesDetail: (challengeId: string) => Request.get(`/v1/challenges/${challengeId}`),
  // 开启场景
  openScene: (challengeId: number) => Request.post(`/v1/open/${challengeId}`),
  // 关闭场景
  closeScene: (challengeId: number) => Request.post(`/v1/close/${challengeId}`),
  // 上传文件
  uploadFile: (file: any) => Request.post(`/v1/wakeup/upload`, file),
};

export default challengeApi;