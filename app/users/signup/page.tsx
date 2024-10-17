'use client';

import SignupForm from '@/components/users/signup/signup-form';
import { useEffect, useState } from 'react';
import { PublicKeyInfo } from '@/types/encryption/public-key-info';
import { getPublicKeyInfo } from '@/components/encryption/getPublicKeyInfo';
import { toast } from 'react-toastify';
import { handleEncryptedSignup } from '@/components/encryption/encryptionSignup';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [baekjoonId, setBaekjoonId] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [publicKeyInfo, setPublicKeyInfo] = useState<PublicKeyInfo | null>(
    null
  );

  useEffect(() => {
    try {
      getPublicKeyInfo(setPublicKeyInfo).then(() => {
        if (publicKeyInfo != null && username != '' && password != '') {
          handleEncryptedSignup(
            { username, password, baekjoonId, introduce },
            publicKeyInfo
          );
        }
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  const handleChangeSignupInfo = (
    username: string,
    password: string,
    baekjoonId: string,
    introduce: string
  ) => {
    setUsername(username);
    setPassword(password);
    setBaekjoonId(baekjoonId);
    setIntroduce(introduce);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-50">
        <div className="bg-white dark:bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-black text-2xl font-bold mb-6 text-center">
            회원가입
          </h1>
          <SignupForm
            publicKeyInfo={publicKeyInfo}
            handleChangeSignupInfo={() => handleChangeSignupInfo}
          />
        </div>
      </main>
    </div>
  );
}
