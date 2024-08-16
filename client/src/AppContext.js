import React, { useContext } from "react"
import { useEffect, useState } from 'react';


const CurrenciesContext = React.createContext()

export default function AppContext({ children }) {

  const [options, setOptions] = useState([])

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
      // setSelectedInputCurrency(entries[0][0])
      // console.log("setSelectedInputCurrency : ", selectedInputCurrency)
      // setSelectedOutputCurrency(entries[0][0])
      // console.log("setSelectedInputCurrency : ", selectedOutputCurrency)
    })
  }

  useEffect(() => {
    fetchDataFromServer()
  }, [])


  return (
    <CurrenciesContext.Provider value={options}>
        {children}
    </CurrenciesContext.Provider>
  )
}

export function useCurrencies() {
  return useContext(CurrenciesContext)
}