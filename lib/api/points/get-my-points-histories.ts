import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 포인트 사용 이력을 가져오는 API
 */
export default function getMyPointsHistories() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/points/histories/me`,
    getAuthenticationConfig()
  );
}
