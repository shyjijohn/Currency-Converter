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

import Homepage from './Homepage';
import Historypage from './Historypage';


function App() {

  // const currencies = useCurrencies()

  console.log("Starting APP")

  const [currentPage, setCurrentPage] = useState('page1');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const [activeId, setActiveId] = useState(1);

  // const items = [
  //   { id: 1, text: "Homepage" },
  //   { id: 2, text: "Historypage" }
  // ];


  // const handleItemClick = (id) => {
  //   console.log("ID", id)
  //   setActiveId(id);
  //   if (id === 1) {
  //     setCurrentPage('page1')
  //   }
  //   else {
  //     setCurrentPage('page2')
  //   }
  // };



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

{/* <div>
              <nav>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={activeId === item.id ? "activeLi" : ""}>
                    </li>
                  ))}
                </ul>
              </nav>
            </div> */}  

      {currentPage === 'page1' && <Homepage handlePageChange={handlePageChange} />}

      {currentPage === 'page2' && <Historypage handlePageChange={handlePageChange} />}

      {/* </div> */}
    </AppContext>
  );
}

export default App
