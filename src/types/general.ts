export type ApiResponse<K extends string, T> = {
  [P in K]: T;
} & {
  total: number;
  skip: number;
  limit: number;
};

export type Filter<T> = {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: keyof T;
  order?: 'asc' | 'desc';
};
