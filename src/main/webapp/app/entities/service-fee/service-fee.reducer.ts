import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IServiceFee, defaultValue } from 'app/shared/model/service-fee.model';

export const ACTION_TYPES = {
  FETCH_SERVICEFEE_LIST: 'serviceFee/FETCH_SERVICEFEE_LIST',
  FETCH_SERVICEFEE: 'serviceFee/FETCH_SERVICEFEE',
  CREATE_SERVICEFEE: 'serviceFee/CREATE_SERVICEFEE',
  UPDATE_SERVICEFEE: 'serviceFee/UPDATE_SERVICEFEE',
  DELETE_SERVICEFEE: 'serviceFee/DELETE_SERVICEFEE',
  RESET: 'serviceFee/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IServiceFee>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ServiceFeeState = Readonly<typeof initialState>;

// Reducer

export default (state: ServiceFeeState = initialState, action): ServiceFeeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERVICEFEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERVICEFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SERVICEFEE):
    case REQUEST(ACTION_TYPES.UPDATE_SERVICEFEE):
    case REQUEST(ACTION_TYPES.DELETE_SERVICEFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SERVICEFEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERVICEFEE):
    case FAILURE(ACTION_TYPES.CREATE_SERVICEFEE):
    case FAILURE(ACTION_TYPES.UPDATE_SERVICEFEE):
    case FAILURE(ACTION_TYPES.DELETE_SERVICEFEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICEFEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICEFEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERVICEFEE):
    case SUCCESS(ACTION_TYPES.UPDATE_SERVICEFEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERVICEFEE):
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

const apiUrl = 'api/service-fees';

// Actions

export const getEntities: ICrudGetAllAction<IServiceFee> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SERVICEFEE_LIST,
  payload: axios.get<IServiceFee>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IServiceFee> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICEFEE,
    payload: axios.get<IServiceFee>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IServiceFee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERVICEFEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IServiceFee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERVICEFEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IServiceFee> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERVICEFEE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
