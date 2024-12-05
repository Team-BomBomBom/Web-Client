import axios from 'axios';

/**
 * 현재 발급받을 수 있는 쿠폰 정보를 가져올 수 있는 API
 */
export default function getCoupons() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/coupons`);
}
