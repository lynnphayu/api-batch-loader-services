import { Character } from 'rickmortyapi/dist/interfaces';

export type FindByIdsRequest = {
  ids: number[];
  rayId: string;
};

export type CharractersResponse = {
  rayId: string;
  chars: Character[];
};
