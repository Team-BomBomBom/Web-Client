import { User } from '../user/user';

export interface SignedUrlReq {
  videoId: string;
}
export interface SignedUrlResp {
  signedUrl: string;
  expire: string;
  keyPairId: string;
  signature: string;
}
export interface AssignmentInfo {
  id: number;
  description: string;
  pageEnd: number;
  pageStart: number;
  title: string;
}
export interface VideoResp {
  assignmentResult: AssignmentInfo;
  profile: User;
}
