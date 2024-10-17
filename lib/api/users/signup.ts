import axios, { AxiosError } from 'axios';

/**
 * 회원가입 API
 * body : username, password, baekjoonId, introduce
 */
export async function signup(
  id: number,
  version: number,
  encryptedData: string
) {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/users/signup`,
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
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      throw new Error('이미 존재하는 아이디입니다.');
    }
    throw new Error('회원가입에 실패했습니다.');
  }
}
