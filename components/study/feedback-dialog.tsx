'use client';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog/dialog';
import { Label } from '@/components/ui/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio/radio-group';
import giveDifficultyFeedback from '@/lib/api/algo/give-feedback';
import { cn } from '@/lib/utils';
import { FeedbackAlgorithmProblemReq } from '@/types/algo/feedback';
import { AlgorithmProblemInfo } from '@/types/study/study-detail';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FlagIcon, FrownIcon, SmileIcon } from '../ui/icon/icon';

export default function FeedbackDialog({
  problem,
  studyId
}: {
  problem: AlgorithmProblemInfo;
  studyId: number;
}) {
  const [difficulty, setDifficulty] = useState('3');
  const [again, setAgain] = useState(false);

  const handleSubmit = async () => {
    const feedback: FeedbackAlgorithmProblemReq = {
      problemId: problem.problemId,
      studyId,
      difficulty: Number(difficulty),
      again
    };
    try {
      const response = await giveDifficultyFeedback(feedback);
      toast.success('피드백이 반영되었습니다.');
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="m-2 px-1 py-0 h-min">
          난이도 피드백
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold">{problem.title}</h3>

            <p className="text-muted-foreground">문제 난이도는 어떠셨나요?</p>
          </div>
          <RadioGroup
            aria-label="Difficulty Level"
            className="flex items-center gap-4 pb-4"
            value={difficulty.toString()}
            onValueChange={(value) => {
              setDifficulty(value);
            }}
          >
            <RadioGroupItem value="1" id="very-easy" className="peer sr-only" />
            <Label
              htmlFor="very-easy"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  'group border hover:bg-gray-600 aspect-square flex items-center justify-center w-12 rounded-full bg-primary text-primary-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
                  difficulty == '1' ? 'bg-gray-900' : ''
                )}
              >
                <SmileIcon
                  className={cn(
                    'w-6 h-6 group-hover:stroke-white rotate-180',
                    difficulty == '1' ? 'stroke-white' : ''
                  )}
                />
              </div>
              <span className="text-sm font-medium">매우 쉬움</span>
            </Label>
            <RadioGroupItem value="2" id="easy" className="peer sr-only" />
            <Label
              htmlFor="easy"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  'group border hover:bg-gray-600 aspect-square flex items-center justify-center w-12 rounded-full bg-primary text-primary-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
                  difficulty == '2' ? 'bg-gray-900' : ''
                )}
              >
                <SmileIcon
                  className={cn(
                    'w-6 h-6 group-hover:stroke-white',
                    difficulty == '2' ? 'stroke-white' : ''
                  )}
                />
              </div>
              <span className="text-sm font-medium">쉬움</span>
            </Label>
            <RadioGroupItem value="3" id="normal" className="peer sr-only" />
            <Label
              htmlFor="normal"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  'group border hover:bg-gray-600 aspect-square flex items-center justify-center w-12 rounded-full bg-primary text-primary-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
                  difficulty == '3' ? 'bg-gray-900' : ''
                )}
              >
                <FlagIcon
                  className={cn(
                    'w-6 h-6 group-hover:stroke-white',
                    difficulty == '3' ? 'stroke-white' : ''
                  )}
                />
              </div>
              <span className="text-sm font-medium">보통</span>
            </Label>
            <RadioGroupItem value="4" id="difficult" className="peer sr-only" />
            <Label
              htmlFor="difficult"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  'group border hover:bg-gray-600 aspect-square flex items-center justify-center w-12 rounded-full bg-primary text-primary-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
                  difficulty == '4' ? 'bg-gray-900' : ''
                )}
              >
                <FrownIcon
                  className={cn(
                    'w-6 h-6 group-hover:stroke-white',
                    difficulty == '4' ? 'stroke-white' : ''
                  )}
                />
              </div>
              <span className="text-sm font-medium">어려움</span>
            </Label>
            <RadioGroupItem
              value="5"
              id="very-difficult"
              className="peer sr-only"
            />
            <Label
              htmlFor="very-difficult"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={cn(
                  'group border hover:bg-gray-600 aspect-square flex items-center justify-center w-12 rounded-full bg-primary text-primary-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
                  difficulty == '5' ? 'bg-gray-900' : ''
                )}
              >
                <FrownIcon
                  className={cn(
                    'w-6 h-6 group-hover:stroke-white rotate-180',
                    difficulty == '5' ? 'stroke-white' : ''
                  )}
                />
              </div>
              <span className="text-sm font-medium">매우 어려움</span>
            </Label>
          </RadioGroup>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="challenge-again"
              checked={again}
              onCheckedChange={(checked: any) => setAgain(checked)}
            />
            <Label htmlFor="challenge-again">다시 풀고 싶은 문제</Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="hover:bg-gray-600 text-gray-50 bg-gray-900"
              onClick={handleSubmit}
              type="button"
            >
              피드백 제출
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
