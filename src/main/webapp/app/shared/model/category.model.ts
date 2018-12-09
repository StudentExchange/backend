import { Moment } from 'moment';

export interface ICategory {
  id?: number;
  name?: string;
  index?: number;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
}

export const defaultValue: Readonly<ICategory> = {};
