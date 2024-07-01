import { BookResult } from '../book/book-result';
import { User } from '../user/user';

export interface Study {
  id: number;
  name: string;
  introduce: string;
  headCount: number;
  capacity: number;
  weeks: number;
  startDate: string;
  leader: User;
  reliabilityLimit: number;
  penalty: number;
  state: string;
  studyType: string;
}

export interface AlgorithmStudy extends Study {
  difficultyMath: number;

  difficultyDp: number;

  difficultyGreedy: number;

  difficultyImpl: number;

  difficultyGraph: number;

  difficultyGeometry: number;

  difficultyDs: number;

  difficultyString: number;

  difficultyGap: number;

  problemCount: number;
}

export interface BookStudy extends Study {
  bookInfo: BookResult;
}

export interface StudyPage {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  contents: Study[];
}
