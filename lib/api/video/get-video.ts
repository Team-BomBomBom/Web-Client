import { VideoResp } from '@/types/video/cloudfront';
import axios from 'axios';

/**
 * Video 정보 API
 *
 */
export default async function getVideo(videoId: string): Promise<VideoResp> {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/videos?id=${videoId}`,
      {}
    )
    .then((response) => {
      return response.data;
    });
}
