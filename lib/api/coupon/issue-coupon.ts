import axios from 'axios';
import { getAuthenticationConfig } from '@/lib/utils';

/**
 * 쿠폰을 발급받는 API
 *
 * @param couponId
 */
export default function issueCoupon(couponId: number) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/coupons/${couponId}`,
    {},
    getAuthenticationConfig()
  );
}
