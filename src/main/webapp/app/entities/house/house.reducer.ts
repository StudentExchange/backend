import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHouse, defaultValue } from 'app/shared/model/house.model';

export const ACTION_TYPES = {
  SEARCH_HOUSES: 'house/SEARCH_HOUSES',
  FETCH_HOUSE_LIST: 'house/FETCH_HOUSE_LIST',
  FETCH_HOUSE: 'house/FETCH_HOUSE',
  CREATE_HOUSE: 'house/CREATE_HOUSE',
  UPDATE_HOUSE: 'house/UPDATE_HOUSE',
  DELETE_HOUSE: 'house/DELETE_HOUSE',
  SET_BLOB: 'house/SET_BLOB',
  RESET: 'house/RESET'
};

const initialState = {
  loading: false,
  loadingDetail: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHouse>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HouseState = Readonly<typeof initialState>;

// Reducer

export default (state: HouseState = initialState, action): HouseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_HOUSES):
    case REQUEST(ACTION_TYPES.FETCH_HOUSE_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_HOUSE):
      return {
        ...state,
        entity: defaultValue,
        errorMessage: null,
        updateSuccess: false,
        loadingDetail: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOUSE):
    case REQUEST(ACTION_TYPES.UPDATE_HOUSE):
    case REQUEST(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_HOUSES):
    case FAILURE(ACTION_TYPES.FETCH_HOUSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOUSE):
    case FAILURE(ACTION_TYPES.CREATE_HOUSE):
    case FAILURE(ACTION_TYPES.UPDATE_HOUSE):
    case FAILURE(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        loading: false,
        loadingDetail: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_HOUSES):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSE):
      return {
        ...state,
        loadingDetail: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOUSE):
    case SUCCESS(ACTION_TYPES.UPDATE_HOUSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/houses';

// Actions

export const getEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: axios.get<IHouse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getHouses: ICrudSearchAction<IHouse> = query => ({
  type: ACTION_TYPES.SEARCH_HOUSES,
  payload: axios.get<IHouse>(`${apiUrl}?${query}&sort=createAt,desc`)
});

export const getTopEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOUSE_LIST,
  payload: axios.get<IHouse>(`${apiUrl}/top?cacheBuster=${new Date().getTime()}`)
});

export const getItemEntities: ICrudSearchAction<IHouse> = query => {
  const requestUrl = `${apiUrl}/items${query ? `?${query}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: axios.get<IHouse>(`${requestUrl}${query ? `&cacheBuster=${new Date().getTime()}` : ''}`)
  };
};

export const getStaffEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/staffs${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: axios.get<IHouse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getOwnerEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/owner${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: axios.get<IHouse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IHouse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE,
    payload: axios.get<IHouse>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHouse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOUSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHouse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOUSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHouse> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOUSE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
