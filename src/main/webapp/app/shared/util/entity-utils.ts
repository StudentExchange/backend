import pick from 'lodash/pick';

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) =>
  idList.filter((entityId: any) => entityId !== '').map((entityId: any) => ({ id: entityId }));

/**
 * Will return a list of values according to the given keys.
 * This function is used to get a values in Many-to-many relations.
 *
 * @param keyList Keys.
 * @param data Array that contains the values.
 * @param fieldName Name of the field that contains the key in the value.
 */
export const keysToValues = (keyList: ReadonlyArray<any>, data: ReadonlyArray<any>, fieldName: string) =>
  keyList.map((k: any) => data.find((e: any) => e[fieldName] === k));
