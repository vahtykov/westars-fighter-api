import { RaRecord } from 'react-admin';

export interface TrainingResponse {
  trainings: any[];
  nextCursor: string | null;
  prevCursor: string | null;
}

export const trainingsMapper = {
  getList: (json: TrainingResponse) => ({
    data: json.trainings,
    total: json.trainings.length,
    hasNextPage: !!json.nextCursor,
    hasPrevPage: !!json.prevCursor,
    nextCursor: json.nextCursor,
    prevCursor: json.prevCursor
  }),
  getOne: (json: any) => ({
    data: json
  }),
  getMany: (json: TrainingResponse) => ({
    data: json.trainings
  })
};