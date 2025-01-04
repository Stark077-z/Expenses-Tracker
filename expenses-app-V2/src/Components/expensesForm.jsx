import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { categories, OnlyStringChars, OnlyNumbers } from '../Global data/data'

export default function ExpensesForm({OnSubmit}) {
    const [Category, setCategory] = useState('Other');
    const [Amount, setAmount] = useState('');
    const [Description, setDescription] = useState('');
    const [isSubmiting, setisSubmiting] = useState(false);
    const [validInfo, setValidInfo] = useState(true)
    const handleAddingNewTransaction = async(e) =>
        {
            e.preventDefault();
            setisSubmiting(true); 
            if((OnlyNumbers.test(Amount) && Amount > 0) && OnlyStringChars.test(Description))
            {
                setValidInfo(true)
                try{
                    await OnSubmit({
                        amount:parseFloat(Amount),
                        category:Category,
                        description:Description
                        })
                    setValidInfo(true);
                    setAmount('')
                    setCategory('Other')
                    setDescription('')
                }finally{
                    setisSubmiting(false)
                }
            }
            else{
                setValidInfo(false)
                setisSubmiting(false)
            }
        }
  return (
    <div className='flex-grow py-3 px-5 font-inter rounded-xl shadow-xl transition-all duration-300
            hover:shadow-2xl'>
        <div className='my-4 flex justify-between items-center font-semibold text-blue-950'>
           <span> Add New Expense</span>
           <FontAwesomeIcon icon={faPlus} className='text-xs text-blue-700 p-1 border-2 border-blue-700 rounded-full' />
        </div>
        <div className='flex flex-wrap items-center gap-2 '>
            <div className="sm:col-span-4 my-1 w-32 flex-grow">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                    Amount
                </label>
                <div className="mt-2">
                <div className="flex p-0.5 items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={Amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    className="block min-w-0 grow py-1 pl-1 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>
                </div>
            </div>
            <div className="sm:col-span-4 my-1 w-fit">
                <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                    Category
                </label>
                <div className="mt-2">
                <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <select value={Category} id='category'
                        onChange={(e)=>setCategory(e.target.value)}
                        className="w-full p-2 outline-none text-sm">
                        {categories.map((catg,index) => 
                            <option key={index} value={catg}>{catg}</option>
                        )}
                    </select>
                </div>
                </div>
            </div>
            <div className="sm:col-span-4 my-1 w-full">
                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                    Description
                </label>
                <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <textarea
                    id="description"
                    rows={2}
                    placeholder="desciption"
                    value={Description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className="block min-w-0 grow py-1 pl-1 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    ></textarea>
                </div>
                </div>
            </div>
        </div>
        <div className='flex items-center'>
            <button 
                onClick={handleAddingNewTransaction} 
                disabled={isSubmiting}
                className={`text-sm m-2 px-3 p-2 rounded-md bg-blue-600 text-white 
                ${isSubmiting ? 'opacity-75' : ''}`}>
                {isSubmiting ? 
                <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Adding...</span>
                </span>
                :<span>Add Expense</span>}
            </button>
            <p className='ms-auto text-red-600 font-light text-xs' 
                style={{display:validInfo ? 'none' : 'block'}}>
                    {
                        [
                            !OnlyNumbers.test(Amount) && "Amount must be a valid number",
                            !OnlyStringChars.test(Description) && "Description must only contain letters"
                        ].filter(Boolean).join(". ")
                    }
            </p>
        </div>
    </div>
  )
}
ExpensesForm.defaultProps = {
    categories: ["Other"],
    OnSubmit: () => Promise.resolve(),
};

