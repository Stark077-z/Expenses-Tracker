import "./App.css"
import Dashboard from './Components/dashboard'
import { useState } from "react";
import ExpensesForm from "./Components/expensesForm";
import ExpensesList from "./Components/expensesList";
import ExpesesChart from "./Components/expesesChart";
import { handleDateTime } from "./Global data/data";

export default function App() {
  const [Transactions , setTransictions] = useState([{type:'income',amount:10000.00}]);
  const [Expenses , setExpenses] = useState([]);

  const OnSubmit = async(newExp) => {
    await new Promise(resolve => setTimeout(resolve,500));

    

    const newExpense = {
      amount : newExp.amount,
      category:newExp.category,
      description:newExp.description,
      date: handleDateTime(new Date()) 
    }
    setExpenses([...Expenses, newExpense]);
    setTransictions([...Transactions, {type:'expense', amount:newExp.amount}])
    
  }
  
  return (
    <div className='py-2 flex flex-col items-stretch xs: lg:w-[1080px]'>
      <header className='flex-grow w-10/12 p-2 flex items-center'>
        <div className='flex justify-center items-center gap-2'>
          <img src={"/projectLogo.png"} width={40} height={40} alt={"logo"} 
              className='rounded-md' />
              <span className='font-inter font-bold'>ExpenseEase</span>
        </div>
      </header>
      <main className="m-uto">
        <div className="mb-3">
            <Dashboard transactions={Transactions} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <div className="flex-grow md:w-2/5"> 
              <ExpensesForm OnSubmit={OnSubmit} />
              <ExpensesList expenses={Expenses} />
            </div>
            <div className="flex justify-center items-center flex-grow md:flex-grow-0">
              <ExpesesChart expenses={Expenses} />
            </div>
        </div>
      </main>
    </div>
  );
};
