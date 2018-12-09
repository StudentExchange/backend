import { Moment } from 'moment';
import { IWard } from 'app/shared/model//ward.model';

export interface IDistrict {
  id?: number;
  name?: string;
  enabled?: boolean;
  type?: string;
  latitude?: number;
  longitude?: number;
  createAt?: Moment;
  updateAt?: Moment;
  regionId?: number;
  regionName?: string;
  cityId?: number;
  cityName?: string;
  wards?: IWard[];
}

export const defaultValue: Readonly<IDistrict> = {
  enabled: false
};
