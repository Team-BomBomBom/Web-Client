import { Button } from '@/components/ui/button/button';
import { CheckIcon, RefreshIcon, XIcon } from '@/components/ui/icon/icon';
import { TableCell, TableRow } from '@/components/ui/table/table';
import {
  AlgorithmProblemInfo,
  StudyMemberInfo
} from '@/types/study/study-detail';

import { useState } from 'react';

export function Row({
  userId,
  problems,
  user
}: {
  userId: number;
  problems: { [problemId: number]: AlgorithmProblemInfo };
  user: StudyMemberInfo;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const refresh = async () => {
    setIsLoading(true);
    // await refreshSolveTF(userId);
    setIsLoading(false);
  };

  return (
    <TableRow>
      <TableCell className="flex items-center font-medium text-center justify-center">
        <p className="text-center">{user.username}</p>
        <Button className="mx-3 rounded-full w-12" onClick={refresh}>
          <RefreshIcon className={isLoading ? 'animate-spin' : ''} />
        </Button>
      </TableCell>
      {Object.entries(problems).map(([key, value]) => (
        <TableCell key={key} className="text-center">
          {user.tasks[Number(key)] ? (
            <div className="flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-primary" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <XIcon className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
