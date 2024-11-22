import { getAuthenticationConfig } from '@/lib/utils';
import { SignedUrlReq, SignedUrlResp } from '@/types/video/cloudfront';
import axios from 'axios';

/**
 * Signed Cookie 요청 API
 * @param {SignedUrlReq} signedUrlReq 스터디 설정 정보
 *
 */
export default async function getSignedCookies(
  videoId: string
): Promise<SignedUrlResp> {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos/signed-url`,

      { videoId } as SignedUrlReq,
      getAuthenticationConfig()
    )
    .then((response) => {
      return response.data;
    });
}
