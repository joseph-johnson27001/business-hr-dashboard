export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/HomePage/KPIData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchGraphData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/HomePage/graphsData.json");
      resolve(data);
    }, 250);
  });
};
