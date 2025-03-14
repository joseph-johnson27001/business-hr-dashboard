export const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeesPage/tableData.json");
      resolve(data);
    }, 250);
  });
};

export const fetchEmployeeKPIs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeesPage/employeeKPIs.json");
      resolve([
        { stat: data.totalEmployees },
        { stat: data.newHiresThisMonth },
        { stat: data.employeesAbsentToday },
        { stat: data.employeeSatisfaction },
        { stat: data.openPositions },
        { stat: data.retentionRate },
        { stat: data.employeeTurnoverRate },
        { stat: data.genderPayGap },
        { stat: data.absenteeism },
        { stat: data.genderBreakdown },
      ]);
    }, 250);
  });
};

export const fetchGraphData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/EmployeesPage/graphsData.json");
      resolve(data);
    }, 250);
  });
};
