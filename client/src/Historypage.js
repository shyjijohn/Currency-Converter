import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


import React from 'react'
import { useEffect, useState, useContext } from 'react';
import AppContext, { useCurrencies } from './AppContext';

// import DatePicker from 'react-datepicker';
import { getFormattedDateString } from './utility';
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




    //daterange

    // let [value, setValue] = useState(new Date())
    const [dateRange, setDateRange] = useState([
        new DateObject().subtract(4, "days"),
        new DateObject().add(4, "days")
    ])

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });


    const [isHistoricalRates, setIsHistoricalRates] = useState(false);


    const [selectedInputCurrencyInGraph, setSelectedInputCurrencyInGraph] = useState('GBP');
    const [selectedOutputCurrencyInGraph, setSelectedOutputCurrencyInGraph] = useState('INR');



    const handleSelect = (ranges) => {
        console.log(ranges.length)
        console.log("DateRange on change : ", ranges)

        if (ranges.length === 2) {
            // setDateRangeFn(ranges[0].toDate, ranges[1].toDate)
            //setDateRange(ranges[0].toDate, ranges[1].toDate)
            var date1 = getFormattedDateString(ranges[0].toDate())
            var date2 = getFormattedDateString(ranges[1].toDate())

            console.log("Now date1 is " + date1)
            console.log("Now date2 is " + date2)
            setDateRange([date1, date2])


            console.log("Start Date: ", ranges[0].toDate())
            console.log("End Date: ", ranges[1].toDate())
        }
    };


    const [amountInGraph, setAmountInGraph] = useState();
    const [baseInGraph, setBaseInGraph] = useState();
    const [axisInGraph, setAxisInGraph] = useState();


    const historicalRatesForDatesGiven = () => {


        var fetchingGraphRange = fetch(`https://api.frankfurter.app/${dateRange[0]}..${dateRange[1]}?from=${selectedInputCurrencyInGraph}&to=${selectedOutputCurrencyInGraph}`)
        var fetchingGraphRangeJson = fetchingGraphRange.then((data) => data.json())
        fetchingGraphRangeJson.then((data) => {
            console.log("jsondata for graphRange.....", data)

            const graphData = Object.entries(data)
            // setHistoricalRates(graphData)
            console.log("graphData", graphData)

            const graphDataAmount = graphData[0][1]
            console.log("graphDataAmount", graphDataAmount)
            setAmountInGraph(graphDataAmount)
            console.log("amountInGraph", amountInGraph)

            const graphDataBase = graphData[1][1]
            console.log("graphDataBase", graphDataBase)
            setBaseInGraph(graphDataBase)
            console.log("baseInGraph", baseInGraph)


            const graphDataAxis = Object.entries(graphData[4][1])
            console.log("graphDataAxis", graphDataAxis)
            setAxisInGraph(graphDataAxis)
            console.log("axisInGraph", axisInGraph)


            setIsHistoricalRates(!isHistoricalRates)

        })
    }


    function handleSelectCurrencyChange1(e) {

        const selectedOptionKey = e.target.getAttribute('key')
        console.log("selectedOptionKey", selectedOptionKey)
        setSelectedInputCurrencyInGraph(e.target.value);
        console.log("selectedInputCurrencyChange", e.target.value)
    }

    function handleSelectCurrencyChange2(e) {
        setSelectedOutputCurrencyInGraph(e.target.value);
        console.log("selectedOutputCurrencyChange", e.target.value)
    }


    return (

        <div class=" fixed inset-0">
            <div class="w-full h-full flex flex-row justify-start">
                <div class="w-screen h-screen flex flex-col justify-start">
                    <div class="bg-blue-50 self-center shadow-xl w-4/5 h-1/3 p-5 mt-10 mx-10">
                        <div class="bg-blue-800 w-6/7 gap-5 flex flex-row justify-between">
                            <div class="bg-blue-500 w-full pt-5 block text-sm font-medium leading-5 text-gray-900">From
                                <select type="text" class="bg-red-600 rounded-lg " value={selectedInputCurrencyInGraph} onChange={(e) => handleSelectCurrencyChange1(e)}>
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

                            <div class="bg-blue-500 w-full pt-5 block text-sm font-medium leading-5 text-gray-900">To
                                <select type="text" class="bg-red-600" value={selectedOutputCurrencyInGraph} onChange={(e) => handleSelectCurrencyChange2(e)}>
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

                        <div class="flex flex-row justify-around">
                            <div class="w-2/3 pt-10 block text-sm font-medium leading-5 text-gray-900">Date Range
                                <DatePicker
                                    className="w-full px-4 pt-2 bg-dark rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                    value={dateRange}
                                    onChange={handleSelect}
                                    range
                                />
                            </div>

                            <button type="submit" onClick={historicalRatesForDatesGiven} class="self-end flex-none rounded-md bg-indigo-500 
                    px-3.5 py-2.5 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">View</button>

                            
                        </div>
                        <button type="submit" onClick={() => props.handlePageChange('page1')} class="self-end flex-none rounded-md bg-gray-200 
                    px-3.5 py-2.5 mt-5 text-sm font-semibold border-black-300 text-black shadow-sm hover:bg-indigo-300 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Back to Home</button>

                    </div>
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
                    <div>

                    </div>
                </div>

                <div class="bg-red-400 w-2/3 h-screen flex flex-col justify-start">
                    <img src="\Images/currency-converter-clipart.jpg" alt="currency" class="w-full h-full bg-red-700" />

                </div>
            </div>
        </div>

    )
}
