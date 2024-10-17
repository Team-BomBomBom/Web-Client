'use client';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PublicKeyInfo } from '@/types/encryption/public-key-info';
import { getPublicKeyInfo } from '@/components/encryption/getPublicKeyInfo';
import { handleEncryptedLogin } from '@/components/encryption/encryptLogin';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [publicKeyInfo, setPublicKeyInfo] = useState<PublicKeyInfo | null>(
    null
  );

  useEffect(() => {
    try {
      getPublicKeyInfo(setPublicKeyInfo).then(() => {
        if (publicKeyInfo != null && username != '' && password != '') {
          handleEncryptedLogin({ username, password }, publicKeyInfo);
        }
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!publicKeyInfo) {
        toast.error('로그인 진행 중입니다. 잠시만 기다려주세요.');
        return;
      }
      const loginInfo = {
        username: username,
        password: password
      };
      const response = await handleEncryptedLogin(loginInfo, publicKeyInfo);
      localStorage.setItem('accessToken', response.data.access_token);
      location.href = '/';
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex justify-center">
          <Link href="/">
            <MountainIcon className="h-8 w-8" />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">아이디</Label>
            <Input
              id="username"
              placeholder="아이디"
              required
              type="id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              required
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit">
            로그인
          </Button>
        </form>
        <div className="flex items-center justify-between text-sm">
          <Link className="underline underline-offset-2" href="#">
            비밀번호 찾기
          </Link>
          <Link className="underline underline-offset-2" href="/users/signup">
            회원 가입
          </Link>
        </div>
      </div>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
