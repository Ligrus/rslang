export interface Card {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface AggregatedWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  userWord?: {
    difficulty: string;
    optional: {
      previous: {
        efactor: number;
        interval: number;
        n: number;
        plannedReviewDate: 'string';
      };
    };
  };
  word: string;
  wordTranslate: string;
  _id: string;
}
export interface AggregatedWordsResponse {
  paginatedResults: AggregatedWord[];
  totalCount: { count: number }[];
}
