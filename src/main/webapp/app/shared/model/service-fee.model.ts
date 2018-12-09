export const enum SaleType {
  SALE_BY_MYSELF = 'SALE_BY_MYSELF',
  SALE_BY_MYSELF_VIP = 'SALE_BY_MYSELF_VIP',
  SALE_SUPPORT = 'SALE_SUPPORT',
  SALE_SUPPORT_VIP = 'SALE_SUPPORT_VIP'
}

export interface IServiceFee {
  id?: number;
  saleType?: SaleType;
  fee?: number;
}

export const defaultValue: Readonly<IServiceFee> = {};
