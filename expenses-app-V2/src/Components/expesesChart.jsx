import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function ExpensesChart({ expenses = [] }) {
  // Ensure expenses is always an array
  const categories = expenses
    .map((expense) => expense.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  // Calculate amounts for each category
  const amounts = categories.map((category) =>
    expenses
      .filter((expense) => expense.category === category)
      .reduce((total, item) => total + parseFloat(item.amount || 0), 0)
  );
  const totalExpenses = amounts.reduce((total, value) => total + value, 0);
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: amounts,
        backgroundColor: [
          '#FF4D4D', // Bright Red
          '#4D88FF', // Bright Blue
          '#FFC04D', // Bright Yellow-Orange
          '#4DFFC0', // Bright Teal
          '#B84DFF', // Bright Purple
          '#FF6E40', // Bright Orange
        ],
        borderColor: [
          '#FF4D4D', // Bright Red
          '#4D88FF', // Bright Blue
          '#FFC04D', // Bright Yellow-Orange
          '#4DFFC0', // Bright Teal
          '#B84DFF', // Bright Purple
          '#FF6E40', // Bright Orange
        ],
        borderWidth: 2,
        hoverBorderWidth: 0,
        spacing: 5,
        borderRadius: 20,
      },
    ],
  };
  
  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1a1a1a',
        bodyColor: '#1a1a1a',
        bodyFont: {
          size: 14,
          weight: '500',
        },
        padding: 12,
        boxPadding: 8,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };
  console.table(expenses)
  return (
    <div className='flex justify-center items-center'>
      {expenses.length === 0 ? (
        <div className="w-[340px] text-center text-gray-500 py-12">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-sm underline font-medium">No expenses yet</p>
        </div>
      ) : (
        <div className="relative flex justify-center items-center" style={{ height: '400px' }}>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 top-40 h-fit p-1">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                    {`$ ${amounts
                    .reduce((acc, curr) => acc + curr, 0)
                    .toFixed(2)}`}
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
