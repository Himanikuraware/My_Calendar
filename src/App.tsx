import React, { useState } from "react";
import "./App.css";

import MyCalendar from "./components/MyCalendar";
import Header from "./components/Layout/Header";
import SelectedDates from "./components/SelectedDates";
import { predefinedRanges } from "./helpers/helper";

function App() {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date, Date] | null
  >(null);
  const [weekendDates, setWeekendDates] = useState<Date[]>([]);

  const handleChange = (
    dateRange: [Date, Date],
    weekendDates: Date[]
  ): void => {
    setSelectedDateRange(dateRange);
    setWeekendDates(weekendDates);
  };

  return (
    <>
      <Header />
      <div className="App">
        <MyCalendar
          onChange={handleChange}
          predefinedRanges={predefinedRanges}
          selectedDateRange={selectedDateRange}
        />

        <SelectedDates
          selectedDateRange={selectedDateRange}
          weekendDates={weekendDates}
        />
      </div>
    </>
  );
}

export default App;
