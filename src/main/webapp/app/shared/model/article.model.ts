import { Moment } from 'moment';

export const enum StatusType {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  SOLD = 'SOLD'
}

export interface IArticle {
  id?: number;
  avatarContentType?: string;
  avatar?: any;
  title?: string;
  link?: string;
  enabled?: boolean;
  summary?: string;
  content?: string;
  statusType?: StatusType;
  hits?: number;
  createAt?: Moment;
  updateAt?: Moment;
  categoryName?: string;
  categoryId?: number;
  createByLogin?: string;
  createById?: number;
  updateByLogin?: string;
  updateById?: number;
}

export const defaultValue: Readonly<IArticle> = {};
