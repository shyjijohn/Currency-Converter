import React from 'react'
import { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { getFormattedDateString } from './utility';

export default function DateRangePickerComponent(props) {

    
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const [startDateInList, setStartDateInList] = useState('')
    const [endDateInList, setEndDateInList] = useState('')
    const [historicalAmount, setHistoricalAmount] = useState();
    const [historicalBase, setHistoricalBase] = useState();
    const [historicalRates, setHistoricalRates] = useState();
    const [isHistoricalRates, setIsHistoricalRates] = useState(false);

    // console.log("setSelectionRangeCom",   {selectionRange}  );
    // console.log("setSelectionRangeCom",   {selectionRange}  );

    useEffect(() => {
        console.log("useEffect running for dateRange...");
    }, [startDateInList])
    useEffect(() => {
        console.log("useEffect running for dateRange...");
    }, [endDateInList])

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        console.log("setSelectionRange", ranges.selection);

        const startDateRangePicker = getFormattedDateString(ranges.selection.startDate);
        setStartDateInList(startDateRangePicker);
        console.log("startDateInList....1...." + startDateRangePicker)

        const endDateRangePicker = getFormattedDateString(ranges.selection.endDate);
        setEndDateInList(endDateRangePicker);
        console.log("endDateInList....1...." + endDateRangePicker)
    };

    const historicalRatesForDatesGiven = () => {
        var fetchingDateRange = fetch(`https://api.frankfurter.app/${startDateInList}..${endDateInList}`)
        var fetchingDateRangeJson = fetchingDateRange.then((data) => data.json())
        fetchingDateRangeJson.then((data) => {
            console.log("jsondata for dataRange.....", data)
            const valuesOfdateRange = Object.values(data)
            console.log("valuesOfdateRange", valuesOfdateRange)

            const amountForDateRange = valuesOfdateRange[0]
            setHistoricalAmount(amountForDateRange)
            console.log("amountForDateRange", amountForDateRange)

            const baseForDateRange = valuesOfdateRange[1]
            setHistoricalBase(baseForDateRange)
            console.log("baseForDateRange", baseForDateRange)

            const historicalRatesForDateRange = Object.entries(valuesOfdateRange[4])
            setHistoricalRates(historicalRatesForDateRange)
            console.log("historicalRatesForDateRange", historicalRatesForDateRange)

            setIsHistoricalRates(!isHistoricalRates)
        })
    }


    return (
        <div class="dateRanges">

            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <div class="dateRangesList">
                Dates between {startDateInList} and {endDateInList}

                <button onClick={historicalRatesForDatesGiven}>Historical Rates</button>
                {isHistoricalRates && (
                    <>
                        <div className='infoText'><h4>RESULT</h4></div>
                        <div className='infoText'>Amount: {historicalAmount}</div>
                        <div className='infoText' >Base: {historicalBase}</div>
                        <div className='infoTextOfRates'>Rates:
                            <div className='multiResult'>
                                {
                                    historicalRates.map(([key, value]) => {
                                        // console.log("Valuefrom map ", value)
                                        return (
                                            // <li key={key}>
                                            <div >
                                                <strong>{key}:</strong>
                                                {
                                                    Object.entries(value).map(([keyOfObj, valueOfObj]) => {
                                                        // console.log("keyOfObj: ", keyOfObj);
                                                        // console.log("valueOfObj: ", valueOfObj);
                                                        return (
                                                            // <li key={keyOfObj}>
                                                            <div className='eachDayResult'>
                                                                <div>{keyOfObj}:{valueOfObj}</div>
                                                                <br />
                                                            </div>
                                                            // </li>
                                                        )
                                                    })
                                                }
                                            </div>
                                            // </li>
                                        )
                                    })}
                            </div>
                        </div>
                    </>
                )}

            </div>

        </div>
    )
}