import { Moment } from 'moment';

export const enum UserActionType {
  FOR_BUY = 'FOR_BUY',
  FOR_SELL = 'FOR_SELL',
  FOR_RENT = 'FOR_RENT',
  FOR_HIRE = 'FOR_HIRE'
}

export const enum DirectionType {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
  EAST_NORTH = 'EAST_NORTH',
  WEST_NORTH = 'WEST_NORTH',
  EAST_SOUTH = 'EAST_SOUTH',
  WEST_SOUTH = 'WEST_SOUTH'
}

export const enum LandType {
  APARTMENT = 'APARTMENT',
  PEN_HOUSE = 'PEN_HOUSE',
  HOME = 'HOME',
  HOME_VILLA = 'HOME_VILLA',
  HOME_STREET_SIDE = 'HOME_STREET_SIDE',
  MOTEL_ROOM = 'MOTEL_ROOM',
  OFFICE = 'OFFICE',
  LAND_SCAPE = 'LAND_SCAPE',
  LAND_OF_PROJECT = 'LAND_OF_PROJECT',
  LAND_FARM = 'LAND_FARM',
  LAND_RESORT = 'LAND_RESORT',
  WAREHOUSES = 'WAREHOUSES',
  KIOSKS = 'KIOSKS',
  OTHER = 'OTHER'
}

export interface IUserSubscription {
  id?: number;
  actionType?: UserActionType;
  keyword?: string;
  costFrom?: number;
  costTo?: number;
  acreageFrom?: number;
  acreageTo?: number;
  direction?: DirectionType;
  floor?: string;
  bathRoom?: number;
  bedRoom?: number;
  parking?: boolean;
  landType?: LandType;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  userLogin?: string;
  userId?: number;
  cityName?: string;
  cityId?: number;
  districtName?: string;
  districtId?: number;
}

export const defaultValue: Readonly<IUserSubscription> = {
  parking: false,
  enabled: false
};
