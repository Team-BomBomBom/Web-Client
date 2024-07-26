import { Row } from '@/components/study/dashboard/row';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table/table';
import getRound from '@/lib/api/study/get-round';
import { AlgorithmRound, StudyDetails } from '@/types/study/study-detail';
import { useParams } from 'next/navigation';

export default function StudyDashBoard({
  details,
  round,
  setRound
}: {
  details: StudyDetails;
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
}) {
  return (
    <div className="mt-5 bg-background rounded-lg border p-6 w-full max-w-4xl h-full">
      <DashBoardHeader round={round} setRound={setRound} details={details} />
      <DashBoardBody round={round} />
    </div>
  );
}

function DashBoardBody({ round }: { round: AlgorithmRound }) {
  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">스터디원</TableHead>
            {Object.values(round.problems).map((problem, index) => (
              <TableHead key={index} className="text-center">
                {problem.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(round.users).map(([key, value]) => (
            <Row
              key={key}
              userId={Number(key)}
              problems={round.problems}
              user={value}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DashBoardHeader({
  round,
  setRound,
  details
}: {
  details: StudyDetails;
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">{details.name}</h2>
      <SelectRound round={round} setRound={setRound} />
    </div>
  );
}

function SelectRound({
  round,
  setRound
}: {
  round: AlgorithmRound;
  setRound: (round: AlgorithmRound) => void;
}) {
  const params = useParams();
  const studyId = params.id.toString();
  const handleRoundChange = async (value: string) => {
    const newRound = await getRound(parseInt(studyId), parseInt(value));
    setRound(newRound);
  };
  const renderSelectContent = () => {
    for (let i = 0; i <= round.idx + 1; i++) {
      return (
        <SelectItem value={(i + 1).toString()}>
          {(i + 1).toString() + ' 주차'}
        </SelectItem>
      );
    }
  };

  return (
    <div className="flex items-center w-1/5 justify-end">
      <Select
        value={(round.idx + 1).toString()}
        onValueChange={handleRoundChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{renderSelectContent()}</SelectContent>
      </Select>
    </div>
  );
}
