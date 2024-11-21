'use client';

import { Button } from '@/components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown/dropdown-menu';
import userIcon from '@/public/user-icon.svg';
import { userState } from '@/recoil/userAtom';
import { User } from '@/types/user/user';
import Link from 'next/link';
import { useResetRecoilState } from 'recoil';

export default function UserProfileDropDown(user: User) {
  const resetUserState = useResetRecoilState(userState);

  function handleLogout() {
    console.log('Logging out...');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    resetUserState();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src={user?.image === null ? userIcon.src : user.image}
            width="32"
            height="32"
            className="rounded-full border"
            alt="Avatar"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <div className="w-full">
            <Link href="/users/mypage" prefetch={false}>
              마이페이지
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full" onClick={handleLogout}>
            <Link href="/" prefetch={false}>
              로그아웃
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
