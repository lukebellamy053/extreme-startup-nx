import { IQuestion } from './IQuestion';

export type PlayerMap = Record<string, IPlayer>;

export type IPlayer = {
  name: string;
  host: string;
  score: number;
  history?: IQuestion[]
}
