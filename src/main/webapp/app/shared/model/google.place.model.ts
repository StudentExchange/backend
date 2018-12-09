export interface IGooglePlace {
  title?: string;
  googleId?: number;
  type?: string[];
  address?: string;
  distance?: number;
  longitude?: number;
  latitude?: number;
}

export const defaultValue: Readonly<IGooglePlace> = {};
