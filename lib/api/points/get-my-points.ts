import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 현재 보유하고 있는 포인트를 가져오는 API
 */
export default function getMyPoints() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/points/me`,
    getAuthenticationConfig()
  );
}
