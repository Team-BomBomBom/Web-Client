'use client';

import BookSearchModal from '@/components/book/book-search-modal';
import DifficultyLevelDialog from '@/components/study/difficulty-level-dialog';
import { getTierInfo, TierIcon } from '@/components/study/tier';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog/dialog';
import { CalendarIcon, PlusIcon, SearchIcon } from '@/components/ui/icon/icon';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select/select';
import { Textarea } from '@/components/ui/textarea/textarea';
import {
  DAYS_PER_WEEK,
  MAX_DIFFICULTY_LEVEL,
  MAX_WEEKS,
  MIN_DIFFICULTY_LEVEL,
  StudyType
} from '@/constants/study/study';
import registerAlgorithmStudy from '@/lib/api/study/create-algorithm-study';
import createBookStudy from '@/lib/api/study/create-book-study';
import { userState } from '@/recoil/userAtom';
import { changeBookInfoProps } from '@/types/book/book-result';
import {
  getStudySchema,
  RegisterAlgorithmStudyReq,
  RegisterBookStudyReq
} from '@/types/study/register-study';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Locales from 'date-fns/locale';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { addDays } from './study-group';

registerLocale('ko', Locales.ko);

function datesFrom(
  startDate: Date,
  intervalOfDay: number,
  times: number
): Date[] {
  return Array.from({ length: times }).map((v, i) => {
    return addDays(startDate, (i + 1) * intervalOfDay);
  });
}
function dateDiff(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function StudyCreateModal({
  showLatest
}: {
  showLatest: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [difficultyBegin, setDifficultyBegin] = useState(MIN_DIFFICULTY_LEVEL);
  const [weeks, setWeeks] = useState(1);
  const [difficultyEnd, setDifficultyEnd] = useState(MAX_DIFFICULTY_LEVEL);
  const [studyType, setStudyType] = useState('');
  const beginTierInfo = getTierInfo(difficultyBegin);
  const endTierInfo = getTierInfo(difficultyEnd);
  const [startDate, setStartDate] = useState(new Date());
  const [bookInfo, setBookInfo] = useState({ title: '', isbn: 0 });

  const [showBookSearchModal, setShowBookSearchModal] = useState(false);
  const [showDifficultyBeginModal, setShowDifficultyBeginModal] =
    useState(false);
  const [showDifficultyEndModal, setShowDifficultyEndModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(getStudySchema(user!))
  });
  const onChange = {
    studyType: register('studyType').onChange,
    difficultyBegin: register('difficultyBegin').onChange,
    difficultyEnd: register('difficultyEnd').onChange,
    isbn: register('isbn').onChange,
    startDate: register('startDate', { valueAsDate: true }).onChange,
    weeks: register('weeks', { valueAsNumber: true }).onChange
  };
  const changeDifficultyBegin = (value: number) => {
    setDifficultyBegin(value);
    onChange.difficultyBegin({
      target: {
        value,
        name: 'difficultyBegin'
      }
    });
  };
  const changeDifficultyEnd = (value: number) => {
    setDifficultyEnd(value);
    onChange.difficultyEnd({
      target: {
        value,
        name: 'difficultyEnd'
      }
    });
  };
  const changeBookInfo = ({ title, isbn }: changeBookInfoProps) => {
    setBookInfo({ title, isbn });
    onChange.isbn({
      target: {
        value: isbn,
        name: 'isbn'
      }
    });
  };

  const onSubmit = async (data: FieldValues) => {
    setOpen(false);

    if (data.studyType == StudyType.ALGORITHM) {
      registerAlgorithmStudy(data as RegisterAlgorithmStudyReq)
        .then((response) => {
          toast.success('알고리즘 스터디를 개설하였습니다');
          showLatest();
        })
        .catch((error) => {
          toast.error(error.response.data);
          console.log(error.response.data);
        });
    } else if (data.studyType == StudyType.BOOK) {
      createBookStudy(data as RegisterBookStudyReq)
        .then((response) => {
          toast.success('기술서적 스터디를 개설하였습니다');
          showLatest();
        })
        .catch((error) => {
          toast.error(error.response.data);
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          <PlusIcon className="w-4 h-4 mr-2 " />
          스터디 개설하기
        </Button>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>새로운 스터디 개설하기</DialogTitle>
            <DialogDescription>
              스터디를 개설하려면 상세정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label className="pl-1" htmlFor="name">
                  스터디 그룹명
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="그룹명을 입력하세요"
                  className="w-full"
                />

                {errors.name?.message && (
                  <span className="pl-1 pt-1 text-sm text-red-700">
                    {errors.name?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="pl-1" htmlFor="introduce">
                소개말
              </Label>
              <Textarea
                id="introduce"
                {...register('introduce')}
                placeholder="스터디 그룹에 대해 소개해주세요"
              />

              {errors.introduce?.message && (
                <span className="pl-1 pt-1 text-sm text-red-700">
                  {errors.introduce?.message as string}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="pl-1" htmlFor="startDate">
                  시작 날짜
                </Label>
                <div>
                  <DatePicker
                    id="startDate"
                    showIcon={true}
                    toggleCalendarOnIconClick={true}
                    icon={
                      <CalendarIcon className="-translate-y-1/2 top-1/2 right-1"></CalendarIcon>
                    }
                    dateFormat="yyyy. MM. dd." // 날짜 형태
                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    selected={startDate}
                    customInput={<Input className="!px-3 mb-0"></Input>}
                    locale={'ko'}
                    minDate={new Date()}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        document.getElementById('endDate')?.focus();
                      }
                    }}
                    onChange={(date) => {
                      setStartDate(date!);
                      onChange.startDate({
                        target: {
                          value: date,
                          name: 'startDate'
                        }
                      });
                    }}
                  />
                </div>
                {errors.startDate?.message && (
                  <span className="pl-1 pt-1 text-sm text-red-700">
                    {errors.startDate?.message as string}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="pl-1" htmlFor="endDate">
                  종료 날짜
                </Label>
                <div>
                  <DatePicker
                    id="endDate"
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        document.getElementById('weeks')?.focus();
                      }
                    }}
                    customInput={<Input className="!px-3 mb-0"></Input>}
                    showIcon={true}
                    toggleCalendarOnIconClick={true}
                    icon={
                      <CalendarIcon className="-translate-y-1/2 top-1/2 right-1"></CalendarIcon>
                    }
                    locale={'ko'}
                    dateFormat="yyyy. MM. dd." // 날짜 형태
                    selected={addDays(startDate, weeks * DAYS_PER_WEEK)}
                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    onChange={(date) => {
                      onChange.weeks({
                        target: {
                          value: dateDiff(startDate, date!) / DAYS_PER_WEEK,
                          name: 'weeks'
                        }
                      });
                      setWeeks(dateDiff(startDate, date!) / DAYS_PER_WEEK);
                    }}
                    includeDates={datesFrom(
                      startDate,
                      DAYS_PER_WEEK,
                      MAX_WEEKS
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="pl-1" htmlFor="weeks">
                  총 주차수
                </Label>
                <Input
                  {...register('weeks', { valueAsNumber: true })}
                  id="weeks"
                  value={weeks.toString()}
                  onChange={(e) => {
                    if (e.target.value == '') {
                      e.target.value = '0';
                    } else if (Number(e.target.value) > 52) {
                      e.target.value = '52';
                    }
                    onChange.weeks({
                      target: {
                        value: e.target.value,
                        name: 'weeks'
                      }
                    });
                    setWeeks(Number(e.target.value));
                  }}
                  type="number"
                />
                {errors.weeks?.message && (
                  <span className="pl-1 pt-1 text-sm text-red-700">
                    {errors.weeks?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="pl-1" htmlFor="penalty">
                  벌금
                </Label>
                <Input
                  id="penalty"
                  {...register('penalty', { valueAsNumber: true })}
                  type="number"
                  className="w-full"
                />
                {errors.penalty?.message && (
                  <span className="pl-1 pt-1 text-sm text-red-700">
                    {errors.penalty?.message as string}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="pl-1" htmlFor="capacity">
                    인원 제한
                  </Label>
                  <Input
                    id="capacity"
                    {...register('capacity', { valueAsNumber: true })}
                    type="number"
                    className="w-full"
                  />
                  {errors.capacity?.message && (
                    <span className="pl-1 pt-1 text-sm text-red-700">
                      {errors.capacity?.message as string}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="pl-1" htmlFor="reliabilityLimit">
                    신뢰도 제한
                  </Label>
                  <Input
                    id="reliabilityLimit"
                    {...register('reliabilityLimit', { valueAsNumber: true })}
                    type="number"
                    className="w-full"
                  />
                  {errors.reliabilityLimit?.message && (
                    <span className="pl-1 pt-1 text-sm text-red-700">
                      {errors.reliabilityLimit?.message as string}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="pl-1" htmlFor="studyType">
                  스터디 종류
                </Label>
                <Select
                  value={studyType}
                  onValueChange={(value) => {
                    onChange.studyType({
                      target: {
                        value,
                        name: 'studyType'
                      }
                    });
                    setStudyType(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={StudyType.ALGORITHM}>
                      {StudyType.ALGORITHM}
                    </SelectItem>
                    <SelectItem value={StudyType.BOOK}>
                      {StudyType.BOOK}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.studyType?.message && (
                  <span className="pl-1 pt-1 text-sm text-red-700">
                    {errors.studyType?.message as string}
                  </span>
                )}
              </div>
            </div>

            {studyType == StudyType.BOOK && (
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label className="pl-1" htmlFor="book-search">
                    도서 검색
                  </Label>
                  <div className=" rounded-md border-gray-200 border wrap-content">
                    <Button
                      className="flex gap-2 w-full justify-between overflow-hidden text-ellipsis whitespace-nowrap"
                      type="button"
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowBookSearchModal(true);
                      }}
                    >
                      <p id="bookName">{bookInfo.title}</p>
                      <SearchIcon className="h-4 w-4 " size="icon" />
                    </Button>
                  </div>
                  {errors.isbn?.message && (
                    <span className="pl-1 pt-1 text-sm text-red-700">
                      {errors.isbn?.message as string}
                    </span>
                  )}
                </div>
              </div>
            )}
            {studyType == StudyType.ALGORITHM && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="pl-1">문제 난이도</Label>
                  <div className="grid grid-cols-5">
                    <Button
                      className="col-span-2"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDifficultyBeginModal(true);
                      }}
                    >
                      <TierIcon {...beginTierInfo}></TierIcon>
                    </Button>
                    <div className="content-center w-full">
                      <p className=" text-center">~</p>
                    </div>
                    <Button
                      className="col-span-2"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDifficultyEndModal(true);
                      }}
                    >
                      <TierIcon {...endTierInfo}></TierIcon>
                    </Button>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      {errors.difficultyBegin?.message && (
                        <span className="pl-1 pt-1 text-sm text-red-700">
                          {errors.difficultyBegin?.message as string}
                        </span>
                      )}
                    </div>
                    <div className="col-start-4 col-span-2">
                      {errors.difficultyEnd?.message && (
                        <span className="pl-1 pt-1 text-sm text-red-700">
                          {errors.difficultyEnd?.message as string}
                        </span>
                      )}
                    </div>
                  </div>
                  {errors.difficultyLevel?.message && (
                    <span className="pl-1 pt-1 text-sm text-red-700">
                      {errors.difficultyLevel?.message as string}
                    </span>
                  )}
                </div>
                <div className="space-y-2 mr-4">
                  <Label className="pl-1" htmlFor="problemCount">
                    문제 개수
                  </Label>
                  <Input
                    id="problemCount"
                    {...register('problemCount', { valueAsNumber: true })}
                    type="number"
                    className="w-[50%]"
                  />
                  {errors.problemCount?.message && (
                    <span className="pl-1 pt-1 text-sm text-red-700">
                      {errors.problemCount?.message as string}
                    </span>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                취소
              </Button>
              <Button className="hover:bg-gray-600 bg-gray-900" type="submit">
                <p className="text-white">스터디 개설하기</p>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DifficultyLevelDialog
        open={showDifficultyBeginModal}
        setOpen={setShowDifficultyBeginModal}
        difficultyLevel={difficultyBegin}
        setDifficultyLevel={changeDifficultyBegin}
      ></DifficultyLevelDialog>

      <DifficultyLevelDialog
        open={showDifficultyEndModal}
        setOpen={setShowDifficultyEndModal}
        difficultyLevel={difficultyEnd}
        setDifficultyLevel={changeDifficultyEnd}
      ></DifficultyLevelDialog>

      <BookSearchModal
        open={showBookSearchModal}
        setOpen={setShowBookSearchModal}
        setBookInfo={changeBookInfo}
      ></BookSearchModal>
    </div>
  );
}
