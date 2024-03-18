import './App.css';
import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Graph from './Graph';
import Convert from './Convert';
import DateRangePickerComponent from './DateRangePickerComponent';
import DatePickerComponent from './DatePickerComponent';
import AppContext, { useCurrencies } from './AppContext';



function App() {

  // const currencies = useCurrencies()

  console.log("Starting APP")

  const [currentPage, setCurrentPage] = useState('page1');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [activeId, setActiveId] = useState(1);

  const items = [
    { id: 1, text: "Convert" },
    { id: 2, text: "Chart" }
  ];


  const handleItemClick = (id) => {
    console.log("ID", id)
    setActiveId(id);
    if (id === 1) {
      setCurrentPage('page1')
    }
    else {
      setCurrentPage('page2')
    }
  };


  console.log("Returning APP")


  return (
    //make a box with shadow effect
    //set the heading convert and charts
    //position the textboxes
    //display the converted currency value

    <AppContext>
      {/* <div className="flex flex-row justify-center align-middle h-screen"> */}


      {/* <div className="w-80 h-80 bg-gray-200 rounded-lg shadow-lg p-4"> */}
      {/* <div className="background">
          <div className="box">

            <div className="app-bar">
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


            {currentPage === 'page2' && <Graph />}

            {currentPage === 'page1' && <Convert />}

            <DatePickerComponent />

            <DateRangePickerComponent />
          </div>
        </div> */}


      {/* <h1 className="text-3xl font-bold">Currency Converter</h1> */}

      {/* <img src = "/Images/currency-converter-clipart.jpg" className="w-full h-full object-cover rounded-t-lg" />
        <div className="w-3/4 h-full bg-black flex flex-col justify-center align-middle"> */}




      <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

              <div class="pointer-events-auto relative w-screen max-w-xl">  {/* edited md to xl*/}

                <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4 ">

                  {/* <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span class="absolute -inset-2.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button> */}
                </div>

                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6 ">
                    <h2 class="text-base font-bold leading-6 text-gray-900" id="slide-over-title">Currency Converter</h2>
                  </div>


                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <div class="w-full h-full rounded-lg shadow-2xl bg-blue-200">
                      <div class="mx-10 pt-8 block text-sm font-medium leading-6 text-gray-900">Amount
                        <input type="number" class="bg-red-600"></input>
                      </div>

                      <div class="mx-10 pt-6 block text-sm font-medium leading-6 text-gray-900">From
                        <input type="text" class="bg-red-600"></input>
                      </div>

                      <div class="mx-10 pt-6 block text-sm font-medium leading-6 text-gray-900">To
                        <input type="text" class="bg-red-600"></input>
                      </div>

                      <div class="rounded-md bg-indigo-600 mr-10 ml-80 mt-8 px-14 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Convert</div>
                    <div class="mx-10 pt-10">ff</div>
                    <div class="mx-10 pt-2.5">gsdfg</div>
                    <div class="mx-10 pt-2.5">gsdg\</div>

                    <div class="flex flex-row justify-start align-middle">
                    <div class="rounded-md bg-indigo-600 ml-10 mr-10 my-10 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >History</div>
                    <div class="rounded-md bg-indigo-600 mx-10 my-10 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Calculators</div>
                    <div class="rounded-md bg-indigo-600 mr-10 ml-10 my-10 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Send</div>

                    </div>
                    </div>

                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>





      </div >
      {/* </div> */}
    </AppContext>
  );
}

export default App
