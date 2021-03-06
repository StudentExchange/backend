import { ILandProjectPhoto } from 'app/shared/model//land-project-photo.model';

export interface ILandProject {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
  photos?: ILandProjectPhoto[];
  cityName?: string;
  cityId?: number;
  districtName?: string;
  districtId?: number;
  wardName?: string;
  wardId?: number;
  createByLogin?: string;
  createById?: number;
  updateByLogin?: string;
  updateById?: number;
}

export const defaultValue: Readonly<ILandProject> = {};
