export const fetchKPIData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/AttendancePage/KPIData.json");
      resolve(data);
    }, 250);
  });
};
