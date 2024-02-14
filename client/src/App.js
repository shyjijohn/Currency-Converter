import './App.css';
import { useEffect, useState } from 'react';


function App() {


  console.log("Starting APP")

  const [options, setOptions] = useState([])
  //console.log("options: ", options)

  const [ inputCurrencyValue, setInputCurrencyValue ] = useState('')
  const [ convertedValue, setConvertedValue ] = useState('')
  const [ selectedInputCurrency, setSelectedInputCurrency ] = useState('')
  const [ selectedOutputCurrency, setSelectedOutputCurrency ] = useState('')

  function fetchDataFromServer() {
    var fetchPromise = fetch(`https://api.frankfurter.app/currencies`)
    var jsonMakingPromise = fetchPromise.then((data) => data.json())
    jsonMakingPromise.then((data) => {
     // console.log("data before changing: ", data)
      const entries = Object.entries(data)
      //data will have json
      // console.log("data1 : ", entries)
      // console.log("data2 : "  + entries)
      setOptions(entries)
    })
  }


  useEffect(() => {
    fetchDataFromServer()
  }, [])

  function handleTextBoxChange(e) 
  {
    setInputCurrencyValue(e.target.value );
   // console.log("textBoxValue"+e.target.value)
  }

  function handleSelectChange1(e) 
  {
    setSelectedInputCurrency(e.target.value);
  }

  function handleSelectChange2(e) 
  {
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
  console.log("Returning APP")


  return (
    <div>
      <div class="container"><h1>Currency Converter</h1></div>
      <div class="row">
        <div class="col">
          <select value={selectedInputCurrency} onChange={handleSelectChange1}>
            {
              options.map((option) => {
                // console.log(option)
                return (
                  <option key={option[0]} value={option[0]}>{option[0]}</option>
                )

              })
            }
          </select>
          <input type="number" value={inputCurrencyValue} onChange={handleTextBoxChange}></input>
        </div>

        <div class="col">
          <select value={selectedOutputCurrency} onChange={handleSelectChange2}>
          {
              options.map((option) => {
                // console.log(option)
                return (
                  <option key={option[0]} value={option[0]}>{option[0]}</option>
                )

              })
            }
          </select>
          <input type="number" value={convertedValue} disabled></input>
        </div>
      </div>

      <button type="submit" onClick={convert}>Convert</button>
      <br />
    </div>
  );
}

export default App
