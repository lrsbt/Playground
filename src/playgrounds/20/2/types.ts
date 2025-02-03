export interface Chapter {
  name: string;
  duration: number;
  percent: number;
  beginsAt: number;
  endsAt: number;
}

export interface PlayerData {
  duration: number;
  currentChapterIndex: number;
  currentChapterPercent: number;
  chapters: Chapter[];
  initialized: boolean;
}
