import React from 'react'
import { useEffect, useState, useContext } from 'react';
import AppContext, { useCurrencies } from './AppContext';


export default function Convert(props) {


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
    
    
    
        // setSelectedInputCurrencyKey(selectedIndex); 
        // console.log("selectedInputCurrencyKey", selectedIndex[1])
    
    
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
    
    
    <div className="convert-fn">
    
    <div className="stacking">
      <div className="amountDiv">
        <div className="amount">Amount</div>
        <input type="number" value={inputCurrencyValue} onChange={handleTextBoxChange}></input>
      </div>
      <div className="fromDiv">
        <div className="from">From</div>
        <select value={selectedInputCurrency} onChange={(e) => handleSelectChange1(e)}>
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

      <div className="toDiv">
        <div className="to">To</div>
        <select value={selectedOutputCurrency} onChange={(e) => handleSelectChange2(e)}>
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


    <div className="resultValue" >
      <div className="inputspan">{inputCurrencyValue}{selectedInputCurrency}{equalto}</div><br />
      <div className="outputspan">{convertedValue}{selectedOutputCurrency}</div>
    </div>
    <div className="buttonDiv">
      <button type="submit" onClick={convert}>Convert</button>
    </div>
    </div>
    
  )
}
