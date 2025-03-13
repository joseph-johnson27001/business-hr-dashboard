export const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/JobsPage/tableData.json");
      resolve(data);
    }, 250);
  });
};
