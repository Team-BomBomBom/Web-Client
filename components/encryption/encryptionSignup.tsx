import { PublicKeyInfo } from '@/types/encryption/public-key-info';
import { encryptData } from '@/components/encryption/getPublicKeyInfo';
import { signup } from '@/lib/api/users/signup';

export const handleEncryptedSignup = async (
  signupInfo: Record<string, string>,
  publicKeyInfo: PublicKeyInfo
) => {
  const encryptedData = encryptData(signupInfo, publicKeyInfo);
  return await signup(publicKeyInfo.id, publicKeyInfo.version, encryptedData);
};
