import axios from 'axios';

/**
 * 로그인 API
 * body : username, password
 */
export async function login(
  id: number,
  version: number,
  encryptedData: string
) {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/auth`,
      {
        id,
        version,
        encryptedData
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    throw new Error('아이디 또는 패스워드가 틀렸습니다.');
  }
}
