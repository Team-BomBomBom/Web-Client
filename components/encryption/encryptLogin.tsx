import { PublicKeyInfo } from '@/types/encryption/public-key-info';
import { login } from '@/lib/api/auth/login';
import { encryptData } from '@/components/encryption/getPublicKeyInfo';

export const handleEncryptedLogin = async (
  loginInfo: {
    username: string;
    password: string;
  },
  publicKeyInfo: PublicKeyInfo
) => {
  const encryptedData = encryptData(loginInfo, publicKeyInfo);
  return await login(publicKeyInfo.id, publicKeyInfo.version, encryptedData);
};
