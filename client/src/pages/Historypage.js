import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


import React from 'react'
import { useEffect, useState, useContext } from 'react';
import AppContext, { useCurrencies } from '../AppContext';

// import DatePicker from 'react-datepicker';
import { getFormattedDateString } from '../utility';
import { DateObject } from 'react-multi-date-picker';

import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from "react-chartjs-2";


//react-multi-date-picker
import DatePicker from "react-multi-date-picker"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"


defaults.maintainAspectRatio = true;
defaults.responsive = true;


export default function Historypage(props) {


    const currencies = useCurrencies()

    const [dateRange, setDateRange] = useState([
        new DateObject().subtract(8, "days"),
        new DateObject().subtract(4, "days")
    ])

    const [isHistoricalRates, setIsHistoricalRates] = useState(false);


    const [selectedInputCurrencyInGraph, setSelectedInputCurrencyInGraph] = useState('GBP');
    const [selectedOutputCurrencyInGraph, setSelectedOutputCurrencyInGraph] = useState('INR');

    const handleSelect = (ranges) => {
        // console.log(ranges.length)
        // console.log("DateRange on change : ", ranges)

        if (ranges.length === 2) {
            setDateRange([ranges[0], ranges[1]])


            // console.log("Start Date: ", ranges[0].toDate())
            // console.log("End Date: ", ranges[1].toDate())


            // setDatesSelected('true')
        }
    };


    const [amountInGraph, setAmountInGraph] = useState();
    const [baseInGraph, setBaseInGraph] = useState();
    const [axisInGraph, setAxisInGraph] = useState();


    const historicalRatesForDatesGiven = () => {

        // console.log("|DATE, ", dateRange)

        var date1 = getFormattedDateString(dateRange[0].toDate())
        // console.log("date1: ", date1)

        var date2 = getFormattedDateString(dateRange[1].toDate())
        // console.log("date2: ", date2)


        var fetchingGraphRange = fetch(`https://api.frankfurter.app/${date1}..${date2}?from=${selectedInputCurrencyInGraph}&to=${selectedOutputCurrencyInGraph}`)
        var fetchingGraphRangeJson = fetchingGraphRange.then((data) => data.json())
        fetchingGraphRangeJson.then((data) => {
            // console.log("jsondata for graphRange.....", data)

            const graphData = Object.entries(data)
            // setHistoricalRates(graphData)
            // console.log("graphData", graphData)

            const graphDataAmount = graphData[0][1]
            // console.log("graphDataAmount", graphDataAmount)
            setAmountInGraph(graphDataAmount)
            // console.log("amountInGraph", amountInGraph)

            const graphDataBase = graphData[1][1]
            // console.log("graphDataBase", graphDataBase)
            setBaseInGraph(graphDataBase)
            // console.log("baseInGraph", baseInGraph)


            const graphDataAxis = Object.entries(graphData[4][1])
            // console.log("graphDataAxis", graphDataAxis)
            setAxisInGraph(graphDataAxis)
            // console.log("axisInGraph", axisInGraph)


            setIsHistoricalRates(!isHistoricalRates)

        })
    }

    // console.log("==========================================", isHistoricalRates)

    function handleSelectCurrencyChange1(e) {

        const selectedOptionKey = e.target.getAttribute('key')
        // console.log("selectedOptionKey", selectedOptionKey)
        setSelectedInputCurrencyInGraph(e.target.value);
        // console.log("selectedInputCurrencyChange", e.target.value)
    }

    function handleSelectCurrencyChange2(e) {
        setSelectedOutputCurrencyInGraph(e.target.value);
        // console.log("selectedOutputCurrencyChange", e.target.value)
    }


    return (

        // <div class="grid gap-8 grid-row-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <div class="flex flex-row">
            <div class="w-full h-full flex flex-col justify-start">

                {/* <h2>HISTORY</h2> */}

                <div class="border border-2-blue-500 self-center rounded-3xl shadow-md w-4/5 h-auto p-5 mt-5 mx-10">
                    <div class="w-6/7 h-full ">
                        <div class="w-6/7 gap-5 py-1 flex flex-row justify-between">
                            <div class="w-full block text-sm font-medium leading-5 text-gray-900">From
                                <select type="text" class="w-full h-10 mt-2 rounded-md shadow-md border border-blue-200" value={selectedInputCurrencyInGraph} onChange={(e) => handleSelectCurrencyChange1(e)}>
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

                            <div class=" w-full block text-sm font-medium leading-5 text-gray-900">To
                                <select type="text" class="w-full h-10 mt-2 rounded-md shadow-md border border-blue-200" value={selectedOutputCurrencyInGraph} onChange={(e) => handleSelectCurrencyChange2(e)}>
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

                        <div class="pt-5 flex flex-col">
                            <div class="w-2/3 block text-sm font-medium leading-5 text-gray-900">Date Range</div>
                            <DatePicker
                                className="w-3/4 px-4 pt-2 bg-dark rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                value={dateRange}
                                onChange={handleSelect}
                                range
                            />
                        </div>

                        <button type="submit" onClick={historicalRatesForDatesGiven} class="self-end flex-none rounded-md bg-blue-500 
                    h-10 w-24 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">View</button>


                        {isHistoricalRates && (
                            <>
                                <Line data={{
                                    labels: axisInGraph.map(([key, value]) => key),
                                    datasets: [
                                        {
                                            label: "Currency",
                                            data: axisInGraph.map(([key, value]) => value[selectedOutputCurrencyInGraph]),
                                            backgroundColor: "rgba(255, 122, 255)",
                                            borderColor: "rgba(255, 132, 123)",
                                        },
                                    ]
                                }}
                                    options={{
                                        elements: {
                                            line: {
                                                tension: 0.5
                                            }
                                        }
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div>

                </div>
            </div>

            <div class="bg-red-400 w-2/3 h-screen flex flex-col justify-start">
                <img src="\Images/currency-converter-clipart.jpg" alt="currency" class="w-full h-full bg-red-700" />

            </div>
        </div>

    )
}
