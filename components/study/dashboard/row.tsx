import { Button } from '@/components/ui/button/button';
import { CheckIcon, RefreshIcon, XIcon } from '@/components/ui/icon/icon';
import { TableCell, TableRow } from '@/components/ui/table/table';
import {
  AlgorithmMemberInfo,
  AlgorithmProblemInfo
} from '@/types/study/study-detail';

import updateTaskStatus from '@/lib/api/algo/update-task-status';
import { userState } from '@/recoil/userAtom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export function Row({
  studyId,
  roundIdx,
  userId,
  problems,
  user
}: {
  studyId: number;
  roundIdx: number;
  userId: number;
  problems: { [problemId: number]: AlgorithmProblemInfo };
  user: AlgorithmMemberInfo;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const refresh = async () => {
    if (user.isUpdating) {
      toast.success('갱신 중입니다. 잠시만 기다려주세요.');
      return;
    }
    // TODO: next.js의 ip주소가 백엔드 ip 주소와 다를 때 사용하도록 수정
    // const refIdToProblemIdMap = createRefIdToProblemIdMap(problems);
    // const solvedProblemRefIds: number[] = await checkAlgorithmProblemSolved(
    //   user.baekjoonId,
    //   Object.keys(refIdToProblemIdMap).map(Number)
    // ).then(getSolvedProblemRefIds);
    // const solvedProblemIds: number[] = solvedProblemRefIds.reduce(
    //   (acc: number[], refId: number) => {
    //     acc.push(refIdToProblemIdMap[refId]);
    //     return acc;
    //   },
    //   []
    // );
    setIsLoading(true);
    const problemIds = Object.keys(problems).map(Number);
    updateTaskStatus({ studyId, roundIdx, problemIds, userId });
  };
  const [my, _] = useRecoilState(userState);
  return (
    <TableRow>
      <TableCell className="flex items-center font-medium text-center justify-center">
        <p className="text-center">{user.username}</p>
        <Button className="mx-3 rounded-full w-12" onClick={refresh}>
          <RefreshIcon
            className={user.isUpdating || isLoading ? 'animate-spin' : ''}
          />
        </Button>
      </TableCell>
      {Object.entries(problems).map(([key, problem]) => (
        <TableCell key={key} className="text-center">
          <div className="flex items-center justify-center">
            {user.tasks[Number(key)] ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <XIcon className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

const createRefIdToProblemIdMap = (problems: {
  [problemId: number]: AlgorithmProblemInfo;
}) => {
  const map: { [refId: number]: number } = {};
  Object.entries(problems).forEach(([key, problem]) => {
    map[problem.refId] = Number(key);
  });
  return map;
};

const getSolvedProblemRefIds = (res: any) => {
  const solvedProblemRefIds: number[] = [];
  res.data.items.forEach((item: any) => {
    solvedProblemRefIds.push(item.problemId);
  });
  return solvedProblemRefIds;
};
