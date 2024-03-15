import React from 'react'
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { getFormattedDateString } from './utility';

export default function DatePickerComponent(props) {


const [selectedDate, setSelectedDate] = useState(null);
const [amount, setAmount] = useState(null);
const [base, setBase] = useState(null);
const [resultDateStr, setResultDateStr] = useState(null);
const [exchangeRates, setExchangeRates] = useState([]);
const minDate = new Date(1999, 0, 4);


useEffect(() => {
  console.log("useEffect running...");
}, [selectedDate])


const handleDateChange = (date) => {
  const datePickerDate = getFormattedDateString(date);
  setSelectedDate(datePickerDate);
  console.log("setSelectedDate2" + selectedDate)
};

const handleCollect = (() => {

  console.log("Enters handleCollect fn")
  var fetchDataCollect = fetch(`https://api.frankfurter.app/${selectedDate}`)
  console.log("fetchDataCollect", fetchDataCollect)

  console.log("check selectedDate" + selectedDate)
  console.log("check minDate" + minDate)


  var jsonDataCollect = fetchDataCollect.then((data) => data.json())
  console.log("dataCollect", jsonDataCollect)

  jsonDataCollect.then((data) => {
    console.log("data", data)

    const valuesOfObject = Object.values(data)
    console.log("valuesOfObject", valuesOfObject)

    setAmount(valuesOfObject[0])
    console.log("amount", valuesOfObject[0])
    setBase(valuesOfObject[1])
    console.log("base", valuesOfObject[1])

    const dataRates = Object.entries(valuesOfObject[3])
    console.log("dataRates", dataRates)
    setExchangeRates(dataRates)

    setResultDateStr(valuesOfObject[2])
  })
})


  return (
    <div class="historical">
            <div class="historical-split">
              <DatePicker
                id="datePicker"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={minDate}
                placeholderText="YYYY-MM-DD"
              />
              <button onClick={handleCollect}>Collect</button>
            </div>
            <div className='infoText'><h4>RESULT</h4></div>
            <div className='infoText'>Amount: {amount}</div>
            <div className='infoText' >Base: {base}</div>
            <div className='infoText'>Date: {resultDateStr}</div>
            <div className='infoTextOfRates'>Rates:
              <ul>
                {exchangeRates.map(([key, value]) => (
                  <li>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
  )
}
