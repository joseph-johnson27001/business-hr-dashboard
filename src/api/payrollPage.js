export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/PayrollPage/KPIData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/PayrollPage/tableData.json");
      resolve(data);
    }, 250);
  });
};
