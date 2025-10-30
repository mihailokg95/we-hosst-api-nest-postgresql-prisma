export interface PaginatedResult<T> {
  total: number;
  data: T[];
  limit: number;
  pageNumber: number;
  totalPages: number;
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const pageNumber = Number(options?.page || defaultOptions?.page) || 1;
    const limit = Number(options?.perPage || defaultOptions?.perPage) || 10;

    const skip = pageNumber > 0 ? limit * (pageNumber - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: limit,
        skip,
      }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      limit,
      pageNumber,
      totalPages,
    };
  };
};
