import React from 'react';
import { Chart } from 'react-google-charts';

const BudgetChart1 = (props) => {
  const { budgetPercentage } = props
  const percentageLeft = 100 - budgetPercentage
  console.log(budgetPercentage)

  const data = [
    ["Task", "Hours per Day"],
    ["Spent", budgetPercentage],
    ["Remaining", percentageLeft],
  ];

  const options = {
    pieHole: 0.5,
    colors: ['navy', 'violet', '#0bcbdc', '#52003a', '#008B00'],
    width: "300",
    height: "300",
    marginLeft: 'auto',
    legend: 'bottom',
  };

  return (
    <div style={{ marginLeft: '0', alignContent: 'flex-start' }}>
      <Chart
        style={{ marginLeft: '0' }}
        chartType="PieChart"
        allign
        data={data}
        options={options}
      />
    </div>

  );
}
export default BudgetChart1