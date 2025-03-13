export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/AttendancePage/KPIData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchGraphData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/AttendancePage/graphsData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/AttendancePage/tableData.json");
      resolve(data);
    }, 250);
  });
};
