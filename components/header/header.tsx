'use client';

import HeaderNavMenu from '@/components/header/header-nav-menu';
import UserProfileDropDown from '@/components/header/user-profile-drop-down';
import { Button } from '@/components/ui/button/button';
import { CouponIcon, LectureIcon, StudyIcon } from '@/components/ui/icon/icon';
import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation/navigation-menu';
import Link from 'next/link';

import { me } from '@/lib/api/users/me'; // API 함수 경로에 맞게 수정
import { userState } from '@/recoil/userAtom';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Header() {
  const [user, setUser] = useRecoilState(userState);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null || user !== null) {
      setIsLoading(false);
      return;
    }
    async function fetchUser() {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [user, setUser]);

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }

  return pathname === '/login' ? null : (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-gray-100 border-b border-slate-900/10">
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex bg-transparent">
        <NavigationMenuList>
          <HeaderNavMenu title="스터디" href="/study" icon={<StudyIcon />} />
          <HeaderNavMenu title="강의" href="#" icon={<LectureIcon />} />
          <HeaderNavMenu
            title="쿠폰/혜택"
            href="/coupon"
            icon={<CouponIcon />}
          />
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        {user ? (
          <UserProfileDropDown {...user} />
        ) : (
          <Link href="/login" prefetch={false}>
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

function MountainIcon(props: Record<string, string>) {
  return (
    <svg
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
