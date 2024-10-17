import { PublicKeyInfo } from '@/types/encryption/public-key-info';

export interface SignupFormProps {
  publicKeyInfo: PublicKeyInfo | null;
  handleChangeSignupInfo: (
    username: string,
    password: string,
    baekjoonId: string,
    introduce: string
  ) => void;
}
