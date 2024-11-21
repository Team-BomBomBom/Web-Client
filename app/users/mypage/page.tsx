'use client';

import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar/avatar';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent } from '@/components/ui/card/card';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';
import { Badge } from '@/components/ui/badge/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible/collapsible';
import { Progress } from '@/components/ui/progress/progress';
import {
  Activity,
  BookOpen,
  ChevronDown,
  Code,
  Link2,
  Mail,
  MapPin,
  Star,
  Users,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import getUsableMyCoupons from '@/lib/api/coupon/get-usable-my-coupons';
import { MyCoupon } from '@/types/coupon/my-coupon';
import getMyPoints from '@/lib/api/points/get-my-points';
import applyCoupon from '@/types/coupon/use-coupon';

export default function ProfilePage() {
  const [myCoupons, setMyCoupons] = useState<MyCoupon[]>([]);
  const [myPoints, setMyPoints] = useState(0);

  const [activeTab, setActiveTab] = useState('studies');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openTask, setOpenTask] = useState<number | null>(null);
  const [profileData, setProfileData] = useState({
    name: '김철수',
    role: '프론트엔드 개발자',
    location: '서울, 대한민국',
    email: 'contact@example.com',
    website: 'myportfolio.com',
    bio: '안녕하세요, 저는 5년 차 프론트엔드 개발자입니다. 사용자 경험을 개선하는 웹 애플리케이션 개발에 열정을 가지고 있습니다. React, TypeScript, 그리고 최신 웹 기술을 활용한 프로젝트 경험이 풍부합니다.',
    trustScore: 85
  });

  useEffect(() => {
    const fetchMyPoints = async () => {
      const response = await getMyPoints();
      return setMyPoints(response.data.points);
    };
    fetchMyPoints();
  }, []);

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    setProfileData((prevData) => ({ ...prevData, ...updatedData }));
    setIsEditModalOpen(false);
  };

  const fetchCoupons = async () => {
    const response = await getUsableMyCoupons();
    return setMyCoupons(response.data.coupons);
  };

  const handleUseCoupon = async (couponId: number) => {
    const response = await applyCoupon(couponId);
    if (response.status === 200) {
      setMyCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === couponId ? { ...coupon, isUsed: true } : coupon
        )
      );
    }
  };

  const studies = [
    {
      name: '모던 JavaScript 스터디',
      topic: 'ES6+',
      members: 8,
      startDate: '2023-05-01',
      status: '활성',
      type: '기술'
    },
    {
      name: 'React 고급 기술',
      topic: 'React Hooks, Context API',
      members: 12,
      startDate: '2023-04-15',
      status: '활성',
      type: '기술'
    },
    {
      name: '알고리즘 마스터',
      topic: '자료구조와 알고리즘',
      members: 6,
      startDate: '2023-03-01',
      status: '완료',
      type: '알고리즘'
    },
    {
      name: 'TypeScript 기초',
      topic: '타입 시스템, 인터페이스',
      members: 10,
      startDate: '2023-06-01',
      status: '활성',
      type: '기술'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'JavaScript 핵심 개념 정리',
      completed: true,
      dueDate: '2023-06-15',
      description:
        'JavaScript의 클로저, 프로토타입, 비동기 프로그래밍 등 핵심 개념을 정리하고 예제 코드 작성하기',
      study: '모던 JavaScript 스터디'
    },
    {
      id: 2,
      title: 'React Hooks 예제 만들기',
      completed: false,
      dueDate: '2023-06-20',
      description:
        'useState, useEffect, useContext, useReducer 등 주요 React Hooks를 사용한 실제 애플리케이션 예제 구현하기',
      study: 'React 고급 기술'
    },
    {
      id: 3,
      title: 'TypeScript 인터페이스 설계',
      completed: false,
      dueDate: '2023-06-25',
      description:
        '실제 프로젝트에서 사용할 수 있는 복잡한 TypeScript 인터페이스를 설계하고 구현하기',
      study: 'TypeScript 기초'
    },
    {
      id: 4,
      title: 'Next.js 라우팅 구현',
      completed: true,
      dueDate: '2023-06-30',
      description:
        'Next.js의 파일 기반 라우팅 시스템을 이용해 복잡한 라우팅 구조를 가진 웹 애플리케이션 구현하기',
      study: 'React 고급 기술'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 프로필 헤더 */}
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
          <Avatar className="w-32 h-32 border-4 border-blue-500">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt={profileData.name}
            />
            <AvatarFallback>{profileData.name}</AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                <p className="text-xl text-gray-600">{profileData.role}</p>
              </div>
              <Button onClick={() => setIsEditModalOpen(true)}>
                프로필 수정
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profileData.location}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profileData.email}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Link2 className="w-3 h-3" />
                {profileData.website}
              </Badge>
            </div>
            <p className="text-gray-600">{profileData.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                현재 포인트
              </h3>
              <div className="text-4xl font-bold text-blue-600">
                {myPoints.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {myPoints > 0
                  ? '사용 가능한 포인트가 있습니다.'
                  : '사용 가능한 포인트가 없습니다.'}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                신뢰도
              </h3>
              <div className="text-4xl font-bold text-yellow-600">
                {profileData.trustScore}
              </div>
              <Progress
                value={profileData.trustScore}
                className="mt-2 h-2 bg-gray-200 [&>div]:bg-yellow-500"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">0</span>
                <span className="text-sm text-gray-500">100</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                상위 {100 - profileData.trustScore}% 신뢰도
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-200 p-1 rounded-lg">
            <TabsTrigger
              value="studies"
              className="rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              스터디
            </TabsTrigger>
            <TabsTrigger
              value="points"
              className="rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              포인트
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              과제
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="rounded-md transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900"
              onClick={() => fetchCoupons()}
            >
              쿠폰
            </TabsTrigger>
          </TabsList>
          <TabsContent value="studies" className="mt-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">참여 중인 스터디</h3>
                <div className="space-y-4">
                  {studies.map((study, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        {study.type === '알고리즘' ? (
                          <Code className="w-5 h-5 text-blue-500" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-green-500" />
                        )}
                        <div>
                          <h4 className="font-medium">{study.name}</h4>
                          <p className="text-sm text-gray-600">{study.topic}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {study.members}명
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 flex flex-col items-end">
                        <Badge
                          variant="secondary"
                          className={
                            study.status === '활성'
                              ? 'bg-green-500 text-white'
                              : ''
                          }
                        >
                          {study.status}
                        </Badge>
                        <span className="text-xs text-gray-500 mt-1">
                          {study.startDate} 시작
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="points" className="mt-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">포인트 사용 내역</h3>
                <div className="space-y-4">
                  {[
                    {
                      date: '2023-06-15',
                      description: '상품 구매',
                      points: -500
                    },
                    {
                      date: '2023-06-10',
                      description: '이벤트 참여 보상',
                      points: 100
                    },
                    {
                      date: '2023-06-05',
                      description: '친구 추천',
                      points: 50
                    },
                    {
                      date: '2023-06-01',
                      description: '월간 적립',
                      points: 200
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <Badge
                        variant={item.points < 0 ? 'destructive' : 'default'}
                        className={cn(
                          item.points > 0 && 'bg-green-500 text-white',
                          item.points < 0 && 'bg-red-500 text-white'
                        )}
                      >
                        {item.points > 0 ? '+' : ''}
                        {item.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks" className="mt-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">과제 목록</h3>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <Collapsible
                      key={task.id}
                      open={openTask === task.id}
                      onOpenChange={() =>
                        setOpenTask(openTask === task.id ? null : task.id)
                      }
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
                          />
                          <span
                            className={`font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}
                          >
                            {task.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openTask === task.id ? 'transform rotate-180' : ''}`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 bg-white border border-gray-200 mt-2 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>마감일: {task.dueDate}</span>
                          <span>스터디: {task.study}</span>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="coupons" className="mt-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">사용 가능한 쿠폰</h3>
                <div className="space-y-4">
                  {myCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{coupon.title}</h4>
                        <p className="text-sm text-gray-600">
                          {coupon.rewardType === 'POINT_REWARD'
                            ? `${Intl.NumberFormat().format(coupon.rewardValue)} 포인트 적립`
                            : coupon.rewardType === 'PERCENTAGE_DISCOUNT'
                              ? `${coupon.rewardValue}% 할인`
                              : ``}
                        </p>
                        <p className="text-sm text-gray-500">
                          유효기간:{' '}
                          {coupon.expireAt
                            ? coupon.expireAt.toLocaleString()
                            : '제한 없음'}
                        </p>
                      </div>
                      {coupon.rewardType === 'POINT_REWARD' ? (
                        <Button
                          onClick={() => handleUseCoupon(coupon.id)}
                          disabled={coupon.isUsed}
                          variant={coupon.isUsed ? 'outline' : 'default'}
                          className={cn(
                            'transition-colors',
                            coupon.isUsed
                              ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              : 'bg-black text-white hover:bg-white hover:text-black'
                          )}
                        >
                          {coupon.isUsed ? '사용 완료' : '사용하기'}
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 프로필 수정 모달 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">프로필 수정</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleEditProfile} className="space-y-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input id="name" name="name" defaultValue={profileData.name} />
              </div>
              <div>
                <Label htmlFor="role">직업</Label>
                <Input id="role" name="role" defaultValue={profileData.role} />
              </div>
              <div>
                <Label htmlFor="location">위치</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profileData.location}
                />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profileData.email}
                />
              </div>
              <div>
                <Label htmlFor="website">웹사이트</Label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={profileData.website}
                />
              </div>
              <div>
                <Label htmlFor="bio">소개</Label>
                <Textarea id="bio" name="bio" defaultValue={profileData.bio} />
              </div>
              <Button type="submit" className="w-full">
                저장
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
