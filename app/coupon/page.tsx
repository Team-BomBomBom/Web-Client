'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card/card';
import { Ticket } from 'lucide-react';
import { Coupon } from '@/types/coupon/coupon';
import getCoupons from '@/lib/api/coupon/get-coupons';
import issueCoupon from '@/lib/api/coupon/issue-coupon';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CouponList() {
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [issuedCoupons, setIssuedCoupons] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await getCoupons();
      setAvailableCoupons(response.data.coupons);
    };
    fetchCoupons();
  }, []);

  const handleIssueCoupon = async (couponId: number) => {
    try {
      const response = await issueCoupon(couponId);
      if (response.status === 200) {
        setIssuedCoupons([...issuedCoupons, couponId]);
        toast.success(
          '쿠폰이 성공적으로 발급되었습니다. 마이 페이지 쿠폰 탭에서 확인하세요.'
        );
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errorCode === 40411) {
          toast.error('존재하지 않는 쿠폰이거나 발급받을 수 없는 쿠폰입니다.');
        } else if (error.response?.data.errorCode === 40618) {
          toast.error('이미 발급받은 쿠폰입니다.');
        } else if (error.response?.data.errorCode === 40617) {
          toast.error('쿠폰 발급 조건이 충족되지 않았습니다.');
        } else {
          toast.error('쿠폰을 발급받을 수 없습니다.');
        }
      } else {
        toast.error('쿠폰을 발급받을 수 없습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              사용 가능한 쿠폰
            </h1>
            <div className="absolute w-full h-3 bg-gray-200 bottom-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 할인 쿠폰으로 더 큰 성장을 이루세요.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCoupons.map((coupon) => (
            <Card
              key={coupon.id}
              className={`w-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-blue-100 border-blue-300 border-2`}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-white p-2 rounded-full">
                  <Ticket className={`h-6 w-6 'text-blue-500'`} />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {coupon.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-gray-600">
                    {coupon.rewardType === 'POINT_REWARD'
                      ? `${Intl.NumberFormat().format(coupon.rewardValue)} 포인트 적립`
                      : coupon.rewardType === 'PERCENTAGE_DISCOUNT'
                        ? `${coupon.rewardValue}% 할인`
                        : ``}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{coupon.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleIssueCoupon(coupon.id)}
                  disabled={issuedCoupons.includes(coupon.id)}
                  className={`w-full ${issuedCoupons.includes(coupon.id) ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  {issuedCoupons.includes(coupon.id) ? '발급완료' : '쿠폰받기'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
