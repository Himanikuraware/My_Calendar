import React from "react";
import "./SelectedDates.css";

interface SelectedDatesProps {
  selectedDateRange: [Date, Date] | null;
  weekendDates: Date[];
}

const SelectedDates: React.FC<SelectedDatesProps> = ({
  selectedDateRange,
  weekendDates,
}) => {
  return (
    <>
      {selectedDateRange && (
        <div className="selected-dates">
          <h2>Selected Date Range:</h2>
          {selectedDateRange && (
            <>
              <p>Start Date: {selectedDateRange[0].toDateString()}</p>
              <p>End Date: {selectedDateRange[1].toDateString()}</p>
            </>
          )}
          {weekendDates.length > 0 && (
            <>
              <h2>Weekend Dates:</h2>
              <p>
                {weekendDates.map((date, index) => (
                  <li key={index}>{date.toDateString()}</li>
                ))}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SelectedDates;
