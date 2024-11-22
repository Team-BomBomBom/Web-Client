import { BookResult } from '../book/book-result';
import { User } from '../user/user';
import { BookTaskAssignment } from './book-task-form';

export interface StudyDetailsAndRound {
  details: StudyDetails;
  round: Round;
}

export interface StudyDetails {
  id: number;
  studyType: string;
  name: string;
  introduce: string;
  headCount: number;
  capacity: number;
  penalty: number;
  leader: User;
  reliabilityLimit: number;
  startDate: Date;
  weeks: number;
  state: StudyStatus;
}

export interface BookStudyDetails extends StudyDetails {
  bookInfo: BookResult;
  duplicated: boolean;
  votingProcess: VotingProcess;
}

export enum VotingProcess {
  READY = 'READY',
  ONGOING = 'ONGOING'
}
export interface VoteAssignmentReq {
  first: number;
  second?: number;
}

export interface BookRound extends Round {
  assignments: {
    [assignmentId: number]: BookTaskAssignment;
  };
  users: {
    [userId: number]: BookMemberInfo;
  };
}

export enum StudyStatus {
  READY = 'READY',
  RUNNING = 'RUNNING',
  END = 'END'
}
export interface Round {
  idx: number;
  startDate: Date;
  endDate: Date;
  users: {
    [userId: number]: StudyMemberInfo;
  };
}

export interface AlgorithmRound extends Round {
  problems: {
    [problemId: number]: AlgorithmProblemInfo;
  };
  users: {
    [userId: number]: AlgorithmMemberInfo;
  };
}

export interface AlgorithmProblemInfo {
  problemId: number;
  refId: number;
  tag: string;
  title: string;
  link: string;
  difficulty: number;
}

export interface StudyMemberInfo {
  username: string;
}

export interface AlgorithmMemberInfo extends StudyMemberInfo {
  baekjoonId: string;
  isUpdating: boolean;
  tasks: {
    [problemId: number]: boolean;
  };
}

export interface BookMemberInfo extends StudyMemberInfo {
  assignmentId: number;
  videoIds: number[];
  problemIds: number[];
}

export interface VideoInfo {
  link: string;
}
export interface QuizInfo {
  link: string;
}
