import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 유저 정보를 가져오는 API
 */
export default function getMyProfile() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/users/me`,
    getAuthenticationConfig()
  );
}
