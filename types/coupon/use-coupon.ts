import { getAuthenticationConfig } from '@/lib/utils';
import axios from 'axios';

/**
 * 특정 유저가 보유하고 있는 쿠폰을 사용하는 API
 */
export default function applyCoupon(couponId: number) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/coupons/${couponId}/apply`,
    {},
    getAuthenticationConfig()
  );
}
