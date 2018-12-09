import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserSubscription, defaultValue } from 'app/shared/model/user-subscription.model';

export const ACTION_TYPES = {
  FETCH_USERSUBSCRIPTION_LIST: 'userSubscription/FETCH_USERSUBSCRIPTION_LIST',
  FETCH_USERSUBSCRIPTION: 'userSubscription/FETCH_USERSUBSCRIPTION',
  CREATE_USERSUBSCRIPTION: 'userSubscription/CREATE_USERSUBSCRIPTION',
  UPDATE_USERSUBSCRIPTION: 'userSubscription/UPDATE_USERSUBSCRIPTION',
  DELETE_USERSUBSCRIPTION: 'userSubscription/DELETE_USERSUBSCRIPTION',
  RESET: 'userSubscription/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserSubscription>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UserSubscriptionState = Readonly<typeof initialState>;

// Reducer

export default (state: UserSubscriptionState = initialState, action): UserSubscriptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERSUBSCRIPTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERSUBSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERSUBSCRIPTION):
    case REQUEST(ACTION_TYPES.UPDATE_USERSUBSCRIPTION):
    case REQUEST(ACTION_TYPES.DELETE_USERSUBSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERSUBSCRIPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERSUBSCRIPTION):
    case FAILURE(ACTION_TYPES.CREATE_USERSUBSCRIPTION):
    case FAILURE(ACTION_TYPES.UPDATE_USERSUBSCRIPTION):
    case FAILURE(ACTION_TYPES.DELETE_USERSUBSCRIPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSUBSCRIPTION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERSUBSCRIPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERSUBSCRIPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_USERSUBSCRIPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERSUBSCRIPTION):
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

const apiUrl = 'api/user-subscriptions';

// Actions

export const getEntities: ICrudGetAllAction<IUserSubscription> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERSUBSCRIPTION_LIST,
    payload: axios.get<IUserSubscription>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IUserSubscription> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERSUBSCRIPTION,
    payload: axios.get<IUserSubscription>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserSubscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERSUBSCRIPTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserSubscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERSUBSCRIPTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserSubscription> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERSUBSCRIPTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
