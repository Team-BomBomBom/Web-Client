import { cn } from '@/lib/utils';
import { MouseEventHandler } from 'react';
import { AlgorithmStudy, BookStudy, Study } from '../../types/study/study';
import {
  BookIcon,
  CalendarIcon,
  CoinsIcon,
  PuzzleIcon,
  ShieldIcon,
  UsersIcon
} from '../ui/icon/icon';
import { getTierInfo } from './tier';

function TierBadge({ difficultyLevel }: { difficultyLevel: number }) {
  const { colorClass, tier, division } = getTierInfo(difficultyLevel);

  return (
    <div
      className={cn(
        `bg-${colorClass}`,
        'text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1'
      )}
    >
      {`${tier.charAt(0) + tier.substring(1).toLowerCase()} ${division}`}
    </div>
  );
}

function AlgorithmStudyInfo(algorithmStudy: AlgorithmStudy) {
  const as = algorithmStudy;
  let difficultyAvg =
    as.difficultyDp +
    as.difficultyDs +
    as.difficultyGeometry +
    as.difficultyGraph +
    as.difficultyGreedy +
    as.difficultyImpl +
    as.difficultyMath +
    as.difficultyString;
  difficultyAvg /= 8;
  const difficultyBegin = Math.round(difficultyAvg);
  const difficultyEnd = difficultyBegin + as.difficultyGap;
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <ShieldIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <TierBadge difficultyLevel={difficultyBegin} />
        <span className="text-gray-600 dark:text-gray-400"> - </span>
        <TierBadge difficultyLevel={difficultyEnd} />
      </div>
      <div className="flex items-center gap-2">
        <PuzzleIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">
          {algorithmStudy.problemCount}개
        </span>
      </div>
    </div>
  );
}

function BookStudyInfo(bookStudy: BookStudy) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <BookIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <p className="text-gray-600 dark:text-gray-400">
        {bookStudy.bookInfo.title}
      </p>
    </div>
  );
}

export function addDays(date: Date, days: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getPeriod(startDate: string, weeks: number): string {
  const date = new Date(startDate);
  const endDate = addDays(date, 7 * weeks);
  return `${date.getMonth() + 1}월 ${date.getDate()}일 - ${endDate.getMonth() + 1}월 ${endDate.getDate()}일`;
}

export default function StudyGroup({
  study,
  onClick
}: {
  study: Study;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="p-6 bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-left font-bold">{study.name}</h2>
        <div className="flex items-center">
          <UsersIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
          <span className="text-nowrap text-gray-600 dark:text-gray-400">
            {study.headCount} / {study.capacity}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CoinsIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {study.penalty}원
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 text-gray-500 mr-2 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {getPeriod(study.startDate, study.weeks)}
          </span>
        </div>
      </div>
      {study.studyType == 'BOOK' ? (
        <BookStudyInfo {...(study as BookStudy)} />
      ) : (
        <AlgorithmStudyInfo {...(study as AlgorithmStudy)} />
      )}
      <p className="text-left text-gray-600 dark:text-gray-400 mb-4">
        {study.introduce.length > 200
          ? study.introduce.substring(0, 200) + '...'
          : study.introduce}
      </p>
    </button>
  );
}
