export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeePage/KPIData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchEmploymentData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeePage/employmentData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchGraphData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeePage/graphsData.json");
      resolve(data);
    }, 250);
  });
};
