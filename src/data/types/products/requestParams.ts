import { MANUFACTURERS } from './product.types';

export type TSortOrder = 'asc' | 'desc';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: MANUFACTURERS | string | MANUFACTURERS[];
  sortField?: ('name' | 'price' | 'createdOn' | 'manufacturer') | string;
  sortOrder?: TSortOrder;
}

type TKeys<K> = keyof K;
type TValues<V> = V[TKeys<V>];

type TReqParams<T> = Record<TKeys<T>, TValues<T>>;

type IProductRequestParams2 = TReqParams<IProductRequestParams>;

const a: IProductRequestParams2 = {
  sortOrder: '',
  manufacturer: 's'
};

