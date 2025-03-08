export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/HomePage/KPIData.json");
      resolve(data);
    }, 500);
  });
};
