import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserLike, defaultValue } from 'app/shared/model/user-like.model';

export const ACTION_TYPES = {
  FETCH_USERLIKE_LIST: 'userLike/FETCH_USERLIKE_LIST',
  FETCH_USERLIKE: 'userLike/FETCH_USERLIKE',
  CREATE_USERLIKE: 'userLike/CREATE_USERLIKE',
  UPDATE_USERLIKE: 'userLike/UPDATE_USERLIKE',
  DELETE_USERLIKE: 'userLike/DELETE_USERLIKE',
  RESET: 'userLike/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserLike>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserLikeState = Readonly<typeof initialState>;

// Reducer

export default (state: UserLikeState = initialState, action): UserLikeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERLIKE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERLIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERLIKE):
    case REQUEST(ACTION_TYPES.UPDATE_USERLIKE):
    case REQUEST(ACTION_TYPES.DELETE_USERLIKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERLIKE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERLIKE):
    case FAILURE(ACTION_TYPES.CREATE_USERLIKE):
    case FAILURE(ACTION_TYPES.UPDATE_USERLIKE):
    case FAILURE(ACTION_TYPES.DELETE_USERLIKE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERLIKE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERLIKE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERLIKE):
    case SUCCESS(ACTION_TYPES.UPDATE_USERLIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERLIKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-likes';

// Actions

export const getEntities: ICrudGetAllAction<IUserLike> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERLIKE_LIST,
  payload: axios.get<IUserLike>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserLike> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERLIKE,
    payload: axios.get<IUserLike>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserLike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERLIKE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserLike> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERLIKE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserLike> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERLIKE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
