export const tableDataReader = {
  serialNo: (data) => data?.["s.no"] ?? "-",
  percentageFunded: (data) => data?.["percentage.funded"] ?? "-",
  amountPledged: (data) => data?.["amt.pledged"] ?? "",
};

export const ROWS_PER_PAGE = 5;

export const NO_OF_PAGINATION_BTNS = 5;