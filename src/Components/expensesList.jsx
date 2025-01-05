import React from 'react'

export default function ExpensesList({expenses}) {
  return (
      <div className="overflow-x-auto m-2.5 rounded-md border-2 border-blue-100 shadow-lg transition-all duration-300
            hover:shadow-xl">
        <table className="min-w-full divide-y divide-gray-200/50">
          <thead>
            <tr className="bg-indigo-950">
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {expenses.length !==0
              ? expenses.map((expense,index) => 
                <tr  className="hover:bg-blue-50/80" key={index}>
                  <td className='p-1.5 whitespace-nowrap ps-6 text-xs text-gray-500'>{expense.date}</td>
                  <td className='p-1.5 whitespace-nowrap ps-6 text-xs text-gray-500'>{expense.description}</td>
                  <td className='p-1.5 whitespace-nowrap ps-6 text-[12px] font-extralight text-blue-800'>
                    <span className='bg-blue-100 rounded-xl px-3 py-[3px]'>{expense.category}</span>
                  </td>
                  <td className='p-1.5 whitespace-nowrap ps-6 text-xs font-extralight text-green-800'>
                    <span className='bg-green-100 rounded-xl px-3 py-[3px]'>$ {expense.amount}</span>
                  </td>
                </tr>
            ) : <tr><td className='text-center p-2 whitespace-nowrap ps-6 text-sm text-gray-500' colSpan={4}>No expensed yet .</td></tr>
          }
          </tbody>
        </table>  
      </div>
  )
}
