import fetchPublicKey from '@/lib/api/encryption/fetch-public-key';
import { PublicKeyInfo } from '@/types/encryption/public-key-info';
import { Dispatch, SetStateAction } from 'react';
import { JSEncrypt } from 'jsencrypt';

export const getPublicKeyInfo = async (
  setPublicKeyInfo: Dispatch<SetStateAction<PublicKeyInfo | null>>
) => {
  try {
    const res = await fetchPublicKey();
    setPublicKeyInfo(res.data);
  } catch (err) {
    throw new Error('보안 설정에 실패했습니다. 잠시 후에 시도해주세요.');
  }
};

export const encryptData = (
  data: Record<string, string>,
  publicKeyInfo: PublicKeyInfo
) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKeyInfo.publicKey);
  const encryptedData = encrypt.encrypt(JSON.stringify(data));
  if (encryptedData === false) {
    throw new Error('암호화에 실패했습니다.');
  }
  return encryptedData;
};
