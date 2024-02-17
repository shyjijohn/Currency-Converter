import './App.css';
import { useEffect, useState } from 'react';


function App() {


  console.log("Starting APP")

  const [options, setOptions] = useState([])
  //console.log("options: ", options)

  const [inputCurrencyValue, setInputCurrencyValue] = useState('')
  const [convertedValue, setConvertedValue] = useState('')
  const [selectedInputCurrency, setSelectedInputCurrency] = useState('fgfgf')
  const [selectedOutputCurrency, setSelectedOutputCurrency] = useState('')
  const [selectedInputCurrencyKey, setSelectedInputCurrencyKey] = useState('')
  const [selectedOutputCurrencyKey, setSelectedOutputCurrencyKey] = useState('')
  const [equalto, setEqualTo] = useState('=')
  const [activeId, setActiveId] = useState(1);


  const items = [
    { id: 1, text: "Convert" },
    { id: 2, text: "Chart" }
  ];


  const handleItemClick = (id) => {
    console.log("ID", id)
    setActiveId(id);
  };

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
      console.log("entries : ", entries)
      setSelectedInputCurrency(entries[0][0])
      console.log("setSelectedInputCurrency : ", selectedInputCurrency)
      setSelectedOutputCurrency(entries[0][0])
      console.log("setSelectedInputCurrency : ", selectedOutputCurrency)
    })
  }


  useEffect(() => {
    fetchDataFromServer()
  }, [])

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
  console.log("Returning APP")


  return (
    //make a box with shadow effect
    //set the heading convert and charts
    //position the textboxes
    //display the converted currency value


    <div class="parent">
      <div class="background">
        <h1>Currency Converter</h1>
        <div class="box">
          <div class="app-bar">
            <nav>
              <ul>
                {items.map((item) => (
                  <li key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={activeId === item.id ? "activeLi" : ""}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div class="stacking">
            <div class="amountDiv">
              <div class="amount">Amount</div>
              <input type="number" value={inputCurrencyValue} onChange={handleTextBoxChange}></input>
            </div>
            <div class="fromDiv">
              <div class="from">From</div>
              <select value={selectedInputCurrency} onChange={(e) => handleSelectChange1(e)}>
                {
                  options.map((option) => {
                    // console.log(option)
                    return (
                      <option key={option[0]} value={option[0]}>{option[0]}</option>
                    )

                  })
                }
              </select>
            </div>

            <div class="toDiv">
              <div class="to">To</div>
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
            </div>
          </div>


          <div class="resultValue" >
            <div class="inputspan">{inputCurrencyValue}{selectedInputCurrency}{equalto}</div><br />
            <div class="outputspan">{convertedValue}{selectedOutputCurrency}</div>
          </div>
          <div class="buttonDiv">
            <button type="submit" onClick={convert}>Convert</button>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default App
