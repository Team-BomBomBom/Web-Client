'use client';

import { Button } from '@/components/ui/button/button';
import { StudyIcon } from '@/components/ui/icon/icon';
import { userState } from '@/recoil/userAtom';
import { VideoIcon } from 'lucide-react';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [myData, setMyData] = useRecoilState(userState);
  return (
    <>
      {/* <div className="text-center">
        {myData?.username + '로 로그인된 상태입니다.'}
      </div> */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-300">
        <div className="space-y-12">
          <div className="ml-12 text-5xl grid grid-rows-3 grid-cols-2 gap-x-12 gap-y-3">
            <b>개발자들의</b>
            <b>Dev&apos;s</b>
            <b>깊이 있는</b>
            <b>Depth</b>
            <b>스터디</b>
            <b>Study</b>
          </div>
          <div className="flex flex-col space-y-2 items-center">
            <Button className="w-1/2 bg-gray-900 text-white py-6 px-6 rounded-lg shadow-md hover:bg-gray-600">
              <div
                onClick={() => (location.href = '/study')}
                className="text-xl flex items-center justify-center space-x-2"
              >
                <StudyIcon className="w-7 h-7"></StudyIcon>
                <p>스터디 시작하기</p>
              </div>
            </Button>
            <Button className="w-1/2 bg-gray-900 text-white py-6 px-6 rounded-lg shadow-md hover:bg-gray-600">
              <div className="text-xl flex items-center justify-center space-x-2">
                <VideoIcon className="w-7 h-7"></VideoIcon>
                <p>강의 둘러보기</p>
              </div>
            </Button>
          </div>
        </div>
        {/* <div className="relative">
          <img
            src="gray-hamster.png"
            alt="hamster with laptop"
            className="w-full max-w-md"
          />
        </div> */}
      </div>
    </>
  );
}
