import { Moment } from 'moment';

export interface IHousePhoto {
  id?: number;
  imageContentType?: string;
  image?: any;
  mobileLink?: string;
  webLink?: string;
  enabled?: boolean;
  createAt?: Moment;
  houseId?: number;
  createByLogin?: string;
  createById?: number;
  updateByLogin?: string;
  updateById?: number;
}

export const defaultValue: Readonly<IHousePhoto> = {
  enabled: false
};
