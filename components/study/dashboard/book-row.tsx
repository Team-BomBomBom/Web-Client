import { PlayIcon, PuzzleIcon, XIcon } from '@/components/ui/icon/icon';
import { TableCell, TableRow } from '@/components/ui/table/table';
import {
  AlgorithmProblemInfo,
  BookMemberInfo
} from '@/types/study/study-detail';

import { Button } from '@/components/ui/button/button';
import { userState } from '@/recoil/userAtom';
import { BookTaskAssignment } from '@/types/study/book-task-form';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export function BookRow({
  studyId,
  roundIdx,
  userId,
  assignment,
  user
}: {
  studyId: number;
  roundIdx: number;
  userId: number;
  assignment: BookTaskAssignment;
  user: BookMemberInfo;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [my, _] = useRecoilState(userState);

  const handler = (videoId: number) => {
    return () => {
      location.href =
        '/video/' + studyId + '/' + assignment.id + '?id=' + videoId;
    };
  };
  return (
    <TableRow>
      <TableCell className="text-center">
        <p className="text-center">{user.username}</p>
      </TableCell>
      <TableCell className="text-center">
        <p className="text-center">{assignment?.title}</p>
      </TableCell>
      <TableCell className="text-center">
        <p className="text-center">{assignment?.description}</p>
      </TableCell>
      <TableCell className="text-center">
        <p className="text-center">
          {assignment?.pageStart} - {assignment?.pageEnd}
        </p>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center">
          {user.videoIds.length !== 0 ? (
            <Button
              className="px-3 py-1 hover:bg-gray-600 bg-gray-900 flex items-center justify-center"
              onClick={handler(user.videoIds[0])}
            >
              <PlayIcon className="w-5 h-5 stroke-white" />
            </Button>
          ) : (
            <XIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center">
          {user.problemIds.length !== 0 ? (
            <Button className="px-3 py-1 hover:bg-gray-600 bg-gray-900 flex items-center justify-center">
              <PuzzleIcon className="w-5 h-5 stroke-white" />
            </Button>
          ) : (
            <XIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </TableCell>
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
