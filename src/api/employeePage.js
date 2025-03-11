export const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeePage/tableData.json");
      resolve(data);
    }, 250);
  });
};
