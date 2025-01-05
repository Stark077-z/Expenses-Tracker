import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowTrendDown, faWallet , faArrowTrendUp, faDollarSign, faScaleBalanced, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({transactions}) {
  
  const handleData = (transactions,type)=>
    {
       const transactionType = transactions.filter(transct => transct.type === type)
        .reduce((acc, transct) => (acc + transct.amount), 0);
        return parseFloat(transactionType).toFixed(2);
    }

  const income = handleData(transactions,'income');
  const expense = handleData(transactions,'expense');
  const Balance = (income - expense).toFixed(2);
  const spending = ((expense / income) * 100).toFixed(1);
  
  return (
    <div>
      <div className="mb-1 px-4 py-3 flex justify-between items-center rounded-t-md">
        <h2 className="text-lg font-semibold">Financial Overview</h2>
        <p style={{userSelect:'none'}} className="text-xs font-light text-gray-600">
          <FontAwesomeIcon icon={faWallet} style={{color: "#4d8eff",}} className="mr-2" />
            Spending: <span className='text-blue-600 underline'>{spending}%</span> of income
        </p>
      </div>
      <section className="px-4 py-2 rounded-t-md flex justify-evenly items-center flex-shrink flex-wrap gap-4">
        <div className="w-full md:w-72 flex md:flex-grow justify-between items-center px-6 py-5  border-[0.2px] bg-emerald-200 bg-opacity-15 border-green-400 rounded-xl 
          shadow-xl transition-all duration-300
            hover:shadow-2xl">
            <div>
                <h6 className='text-[14px] text-emerald-700'>
                  <FontAwesomeIcon icon={faCaretDown} className='mr-1.5' />
                  Total Income
                </h6>
                <p className="text-2xl text-green-700 ms-1 font-bold"><FontAwesomeIcon icon={faDollarSign} className='mr-1.5 text-xl' />{income} </p>
            </div>
            <div>
                <FontAwesomeIcon icon={faArrowTrendUp} className="p-3.5 bg-blue-300 bg-opacity-20 hover:bg-green-100 transition-all rounded-full" style={{color:'green'}}/>
            </div>
        </div>
        
        <div className="w-full md:w-72 flex md:flex-grow justify-between items-center px-6 py-5 border-[0.2px] bg-rose-200 bg-opacity-15 border-rose-400 rounded-xl
            shadow-xl transition-all duration-300
              hover:shadow-2xl">
            <div>
                <h6 className='text-[14px] text-red-500'>
                  <FontAwesomeIcon icon={faCaretDown} className='mr-1.5' />
                  Total Expenses
                </h6>
                <p className="text-2xl text-red-700 ms-1 font-bold"><FontAwesomeIcon icon={faDollarSign}  className='mr-1.5 text-xl'/>{expense} </p>
            </div>
            <div>
                <FontAwesomeIcon icon={faArrowTrendDown} className="p-3.5 bg-red-300 bg-opacity-20 hover:bg-red-100 transition-all rounded-full" style={{color:'red'}}/>
            </div>
        </div>

        <div className="w-full md:w-72 flex md:flex-grow justify-between items-center px-6 py-5 border-[0.2px] bg-blue-00 bg-opacity-15 border-blue-400 rounded-xl
            shadow-xl transition-all duration-300
              hover:shadow-2xl">
            <div>
                <h6 className='text-[14px] text-blue-700'>
                  <FontAwesomeIcon icon={faCaretDown} className='mr-1.5' />
                  Current Balance
                </h6>
                <p className="text-2xl text-blue-800 ms-1 font-bold"><FontAwesomeIcon icon={faDollarSign}  className='mr-1.5 text-xl'/>{Balance} </p>
            </div>
            <div>
                <FontAwesomeIcon icon={faScaleBalanced} className="p-3.5 bg-blue-300 bg-opacity-20 hover:bg-blue-100 transition-all rounded-full" style={{color:`${Balance > 0 ? 'blue' : 'red'}`}}/>
            </div>
        </div>
      </section>
    </div>
  )
}
