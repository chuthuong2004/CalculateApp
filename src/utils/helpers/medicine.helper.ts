import {StoreUnitMedicine, StoreOrderItem} from '@/types/entities';
import {TRANSFORM_LABEL_UNITS} from '@utils/constants';

/**
 * Calculate the quantity to buy for each unit in the order
 * @param units Array of units medicine
 * @param unit Unit to be calculated
 * @param orderItems Array of order items
 * @returns number - Quantity to buy in units
 */
export function getQuantityToBuy(
  units: StoreUnitMedicine[],
  unit: StoreUnitMedicine,
  orderItems: StoreOrderItem[],
) {
  const totalQuantity = getTotalQuantityBought(units, orderItems);
  const indexUnit = units.findIndex(item => item.unit === unit.unit);
  const newUnits = units.slice(indexUnit);
  const totalCanBuy = newUnits.reduce((acc, item, index) => {
    if (index === newUnits.length - 1 || item.contain === 0) {
      return acc;
    }
    return acc * item.contain;
  }, 1);

  return Math.floor(totalQuantity / totalCanBuy);
}

/**
 * get total quantity bought
 * @param units Array of units medicine
 * @param orderItems Array of order items
 * @param deep If true, the quantity will be calculated in the smallest unit. For example: Hộp x 12 Vỉ x 8 Viên x 20g, the smallest unit will be grams, according to the purchase order. Otherwise, only take into account the PILL unit, for example: 2000 PILL
 * @returns number - if deep is true, return 18876g, otherwise return 29833 Viên
 */
export function getTotalQuantityBought(
  units: StoreUnitMedicine[],
  orderItems: StoreOrderItem[],
  deep = true,
) {
  const listQuantity = orderItems.map(orderItem => {
    const foundIndexUnit = units.findIndex(
      unit => unit.unit === orderItem.unit,
    );
    const newUnits = units.slice(foundIndexUnit);
    const priceWithMinUnit = newUnits.reduce((acc, unit, index) => {
      if (!deep) {
        if (index < newUnits.length - 1) {
          const nextUnit = newUnits[index + 1];
          if (!nextUnit.is_calculate) {
            return acc;
          }
        }
      }
      if (unit.contain === 0 || !unit.is_calculate) {
        return acc;
      }
      return acc * unit.contain;
    }, 1);
    return orderItem.quantity * priceWithMinUnit;
  });
  return listQuantity.reduce((acc, q) => acc + q, 0);
}

/**
 * Get min unit -- example: BOX or PILL ...
 * @param units - Array unit medicine
 * @returns  string -- example: BOX or PILL ...
 */
export function getMinUnit(units: StoreUnitMedicine[]) {
  return (
    units.find((item, i, array) => {
      if (i < array.length - 1) {
        const nextItem = array[i + 1];
        if (!nextItem.is_calculate) {
          return true;
        }
      }
      return !item.children && item.is_calculate;
    })?.unit || units[0]?.unit
  );
}

/**
 * Get min unit -- example: BOX or PILL ...
 * @param units - Array unit medicine
 * @returns  string -- example: BOX or PILL ...
 */
export function getMinUnitObject(units: StoreUnitMedicine[]) {
  return (
    units.find((item, i, array) => {
      if (i < array.length - 1) {
        const nextItem = array[i + 1];
        if (!nextItem.is_calculate) {
          return true;
        }
      }
      return !item.children && item.is_calculate;
    }) || units[0]
  );
}

/**
 * Get string quantity total
 * @param units  Array unit medicine
 * @param store_id id store to get total by store. Default undefined
 * @returns string - example: 2.504 Thùng - 600 Hộp - 20 Viên
 */
export function getTotalQuantityUnit(
  units: StoreUnitMedicine[],
  store_id?: string,
) {
  return units
    .map((unit, i, currentArray) => {
      const existed = store_id
        ? unit.stores.find(store => store.store_id._id === store_id)
        : undefined;
      if (store_id && !existed) {
        return '';
      }
      if (store_id && existed) {
        if (i === 0) {
          return `${existed.quantity.toLocaleString('vi')} ${
            TRANSFORM_LABEL_UNITS[unit.unit]
          }`;
        }
        const prevUnit = currentArray[i - 1];
        return `${(existed.quantity % prevUnit.contain).toLocaleString('vi')} ${
          TRANSFORM_LABEL_UNITS[unit.unit]
        }`;
      }
      if (i === 0) {
        return `${unit.total_quantity.toLocaleString('vi')} ${
          TRANSFORM_LABEL_UNITS[unit.unit]
        }`;
      }
      const prevUnit = currentArray[i - 1];
      return `${(unit.total_quantity % prevUnit.contain).toLocaleString(
        'vi',
      )} ${TRANSFORM_LABEL_UNITS[unit.unit]}`;
    })
    .filter(item => item !== '')
    .join(' - ');
}

/**
 * Get string packing
 * @param units Array unit medicine
 * @returns string - example: Hộp x 12 Vỉ x 8 Viên
 */
export function getPackingSpecificationUnit(units: StoreUnitMedicine[]) {
  const title = units.map(unit => TRANSFORM_LABEL_UNITS[unit.unit]);
  return units
    .map(
      (unit, idx) =>
        `${title?.[idx]}${unit.contain ? ` x ${unit.contain}` : ''}`,
    )
    .join(' ');
}

/**
 * Calculate the total quantity in the smallest unit
 * @param units Array of units medicine
 * @param store_id Store ID to calculate total quantity smallest unit
 * @returns number - Example: 20 Viên
 */
export function getTotalQuantityMinUnit(
  units: StoreUnitMedicine[],
  store_id?: string,
) {
  const minUnit = getMinUnit(units);
  const minUnitObj = units.find(unit => unit.unit === minUnit);
  if (!minUnitObj) {
    return 0;
  }
  if (!store_id) {
    return minUnitObj.total_quantity;
  }
  return (
    minUnitObj.stores.find(store => store.store_id._id === store_id)
      ?.quantity || 0
  );
}

export function getQuantityUnitPurchase(
  units: StoreUnitMedicine[],
  orderItems: StoreOrderItem[],
) {
  const filteredUnits = units.filter(unit =>
    orderItems.find(orderItem => orderItem.unit === unit.unit),
  );
  const renderTitleUnit = filteredUnits
    .map(unit => {
      const orderItemFoundByUnit = orderItems.find(
        orderItem => orderItem.unit === unit.unit,
      );
      if (!orderItemFoundByUnit) {
        return '';
      }
      return `${orderItemFoundByUnit.quantity.toLocaleString('vi')} ${
        TRANSFORM_LABEL_UNITS[unit.unit]
      }`;
    })
    .filter(item => item !== '')
    .join(' ');
  return renderTitleUnit;
}
