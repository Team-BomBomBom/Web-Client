import axios from 'axios';

/**
 * 종단간 암호화 적용을 위한 서버의 public key 조회 API
 */

export default function fetchPublicKey() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/encryption/public-key`
  );
}
