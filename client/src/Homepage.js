import React from 'react'
import { useEffect, useState, useContext } from 'react';
import AppContext, { useCurrencies } from './AppContext';




export default function Homepage(props) {


    const currencies = useCurrencies()



    const [inputCurrencyValue, setInputCurrencyValue] = useState('')
    const [convertedValue, setConvertedValue] = useState('')
    const [selectedInputCurrency, setSelectedInputCurrency] = useState('USD')
    const [selectedOutputCurrency, setSelectedOutputCurrency] = useState('GBP')
    const [selectedInputCurrencyKey, setSelectedInputCurrencyKey] = useState('')
    const [selectedOutputCurrencyKey, setSelectedOutputCurrencyKey] = useState('')
    const [equalto, setEqualTo] = useState('=')




    function handleTextBoxChange(e) {
        setInputCurrencyValue(e.target.value);
        // console.log("textBoxValue"+e.target.value)
    }

    function handleSelectChange1(e) {

        // const selectedIndex = e.target.selectedIndex.options.map((option) =>{option[1]})
        // console.log("selectedIndex", selectedIndex)

        const selectedOptionKey = e.target.getAttribute('key')
        // // console.log("e.target.options[selectedIndex]", e.target.options[selectedIndex])
        // // console.log("getAttribute('data-key')", getAttribute('data-key')) 
        console.log("selectedOptionKey", selectedOptionKey)

        setSelectedInputCurrency(e.target.value);
        console.log("selectedInputCurrency", e.target.value)
    }


    function handleSelectChange2(e) {
        setSelectedOutputCurrency(e.target.value);
    }

    function convert() {

        console.log("convert fn");
        //currency 1 and 2
        //money as number in currency 1
        //use the above two values to convert currency 1 to currency 2
        //assign the calculated currency value to calculatedValue usestate variable

        fetch(`https://api.frankfurter.app/latest?amount=${inputCurrencyValue}&from=${selectedInputCurrency}&to=${selectedOutputCurrency}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("jsondata.....", data)
                //  const array = Object.entries(data)
                setConvertedValue(Object.values(data.rates)[0])
            })
    }

    return (
      
        <div class="flex flex-row justify-between align-start w-screen h-screen">
            <img src="\Images/currency-converter-clipart.jpg" alt="currency" class="w-full h-full bg-red-700" />

            <div class="w-4/5 h-screen flex justify-center align-middle bg-gray-500">
                <div class="bg-blue-100 self-center flex justify-center items-center rounded-3xl shadow-lg w-2/3 h-3/4 ">

                    <div class="w-4/5 h-4/5 self-center bg-gray-500 flex flex-col justify-start">
                    <div class="flex flex-col justify-start items-center ">
                        <div class="w-5/6 block text-sm font-medium leading-5 text-gray-900 bg-purple-500">Amount
                            <input type="number" class="bg-red-600" value={inputCurrencyValue} onChange={handleTextBoxChange}></input>
                        </div>

                        <div class="w-5/6 pt-5 block text-sm font-medium leading-5 text-gray-900">From
                            <select type="text" class="bg-red-600" value={selectedInputCurrency} onChange={(e) => handleSelectChange1(e)}>
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

                        <div class="w-5/6 pt-5 block text-sm font-medium leading-5 text-gray-900">To
                            <select type="text" class="bg-red-600" value={selectedOutputCurrency} onChange={(e) => handleSelectChange2(e)}>
                                {
                                    currencies.map((option) => {
                                        console.log("option...to know...", option)
                                        return (
                                            <option key={option[0]} value={option[0]}>{option[0]}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button type="submit" onClick={convert} class="self-end flex-none rounded-md bg-indigo-500 
                    px-3.5 py-2.5 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Convert</button>

                    <div class="flex flex-col self-start px-8 py-4">
                        <div>{inputCurrencyValue}{selectedInputCurrency}=</div>
                        <div>{convertedValue}{selectedOutputCurrency}</div>
                        <div>wait</div>
                    </div>

                    <div class="flex flex-row flex-wrap self-center">
                        <button type="submit" onClick={() => props.handlePageChange('page2')} class="self-start flex-none rounded-md bg-indigo-500 
                    px-3.5 py-2.5 mx-2 mt-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">History</button>

                        <button type="submit" class="self-center flex-none rounded-md bg-indigo-500 
                    px-3.5 py-2.5 mx-2 mt-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Calculators</button>

                        <button type="submit" class="self-end flex-none rounded-md bg-indigo-500 
                    px-3.5 py-2.5 mx-2 mt-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Send</button>
                    </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
