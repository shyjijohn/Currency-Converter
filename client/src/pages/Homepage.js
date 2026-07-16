import React from 'react'
import { useState } from 'react';
import { useCurrencies } from '../AppContext';
import { useNavigate } from "react-router-dom";




export default function Homepage() {


    const currencies = useCurrencies()
    const navigate = useNavigate();



    const [inputCurrencyValue, setInputCurrencyValue] = useState('1')
    const [, setConvertedValue] = useState('')
    const [convertedValueStr, setConvertedValueStr] = useState('___ GBP')
    const [selectedInputCurrency, setSelectedInputCurrency] = useState('USD')
    const [selectedOutputCurrency, setSelectedOutputCurrency] = useState('GBP')




    function handleTextBoxChange(e) {
        setInputCurrencyValue(e.target.value);
    }

    function handleSelectChange1(e) {
        const selectedOptionKey = e.target.getAttribute('key')
        // console.log("selectedOptionKey", selectedOptionKey)

        setSelectedInputCurrency(e.target.value);
        // console.log("selectedInputCurrency", e.target.value)
    }


    function handleSelectChange2(e) {
        setSelectedOutputCurrency(e.target.value);
    }

    function convert() {

        // console.log("convert fn");
        //currency 1 and 2
        //money as number in currency 1
        //use the above two values to convert currency 1 to currency 2
        //assign the calculated currency value to calculatedValue usestate variable

        fetch(`https://api.frankfurter.dev/v1/latest?amount=${inputCurrencyValue}&from=${selectedInputCurrency}&to=${selectedOutputCurrency}`)
            .then((data) => data.json())
            .then((data) => {
                // console.log("jsondata.....", data)
                //  const array = Object.entries(data)
                setConvertedValue(Object.values(data.rates)[0])

                setConvertedValueStr(Object.values(data.rates)[0] + " " + selectedOutputCurrency)

            })
    }

    return (

        // <div className="grid gap-4 grid-row-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <div>
            <div className=' md:absolute m-5 flex flex-row items-center'>
                <div>
                    <img src='images/currency.png' alt="currency" className="object-contain w-10 h-10 mr-2" />
                </div>
                <div className='text-2xl font-medium text-slate-700 tracking-wider'>
                    RateGrapher
                </div>
            </div>

            <div className=" flex gap-4 flex-col-reverse md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-around">
                <div className=" min-w-fit w-7/12 h-auto">

                    <img src="images/currency-converter-clipart.jpg" alt="currency" className="object-contain min-w-44 w-full h-screen" />
                </div>

                <div className=" min-w-fit p-5 md:w-3/12 h-auto flex justify-center align-middle">
                    <div className=" border p-5 m-0 border-indigo-200 self-center flex justify-center items-center rounded-3xl shadow-md ">

                        <div className=" w-full h-full self-center flex flex-col justify-start">
                            <div className="flex flex-col justify-start items-start ">
                                <div className="w-full block text-sm font-medium leading-5 text-gray-900">Amount</div>
                                <input type="number" className="w-full h-10 mt-2 pl-5 rounded-md shadow-md border border-blue-200 " value={inputCurrencyValue} onChange={handleTextBoxChange}></input>

                                <div className="w-full pt-5 block text-sm font-medium leading-5 text-gray-900">From
                                    <select type="text" className="w-full h-10 mt-2 pl-3 rounded-md shadow-md border border-blue-200" value={selectedInputCurrency} onChange={(e) => handleSelectChange1(e)}>
                                        {
                                            currencies.map((option) => {
                                                // console.log(option)
                                                return (
                                                    <option key={option[0]} value={option[0]}>{option[0]}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="w-full pt-5 block text-sm font-medium leading-5 text-gray-900">To
                                    <select type="text" className="w-full h-10 mt-2 pl-3 rounded-md shadow-md border border-blue-200" value={selectedOutputCurrency} onChange={(e) => handleSelectChange2(e)}>
                                        {
                                            currencies.map((option) => {
                                                // console.log("option...to know...", option)
                                                return (
                                                    <option key={option[0]} value={option[0]}>{option[0]}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <button type="submit" onClick={convert} className="self-end flex-none rounded-md bg-blue-500 
                    h-10 w-24 mt-10 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Convert</button>

                            <div className="flex flex-col self-start py-4 mt-4">
                                <div>{inputCurrencyValue} {selectedInputCurrency}=</div>
                                <div className="font-bold text-xl">{convertedValueStr}</div>
                            </div>

                            <div className=" flex flex-row flex-wrap justify-normal">
                                <button type="submit" onClick={() => navigate("/historypage")} className="self-start flex-none rounded-md bg-blue-500 
                    h-10 w-20 m-1 md:w-24 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">History</button>

                                <button type="submit" className="self-center flex-none rounded-md bg-blue-500 
                    h-10 w-24 m-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Calculators</button>

                                <button type="submit" className="self-end flex-none rounded-md bg-blue-500 
                    h-10 w-20 m-1 md:w-24 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Send</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}