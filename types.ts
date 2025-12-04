export enum Sender {
  USER = 'user',
  AI = 'ai'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
}

export interface GrammarRule {
  title: string;
  description: string;
  examples: string[];
}

export enum ExerciseStatus {
  IDLE = 'idle',
  GENERATING = 'generating',
  WAITING_FOR_ANSWER = 'waiting',
  EVALUATING = 'evaluating',
  COMPLETED = 'completed'
}

export interface ExerciseState {
  sentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
  userAnalysis: string;
  feedback: string;
}