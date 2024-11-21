import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 특정 유저가 사용할 수 있는 쿠폰 목록을 가져오는 API
 */
export default function getUsableMyCoupons() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/coupons/me`,
    getAuthenticationConfig()
  );
}
