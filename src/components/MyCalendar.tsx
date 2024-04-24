import React, { useState } from "react";
import "./MyCalendar.css";
import { MyCalendarProps, weekdays } from "../helpers/helper";

const MyCalendar: React.FC<MyCalendarProps> = ({
  currentDate = new Date(),
  onChange,
  predefinedRanges = [],
  selectedDateRange,
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getWeekendDatesInRange = (start: Date, end: Date): Date[] => {
    const weekendDates: Date[] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        weekendDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekendDates;
  };

  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleChangeMonth = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCurrentMonth(parseInt(event.target.value));
  };

  const handleChangeYear = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCurrentYear(parseInt(event.target.value));
  };

  const handleDayClick = (day: number): void => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (!startDate && !isWeekend(selectedDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (
      !endDate && startDate &&
      selectedDate > startDate &&
      !isWeekend(selectedDate)
    ) {
      setEndDate(selectedDate);
      const dateRange: [Date, Date] = [startDate!, selectedDate];
      const weekendDates = getWeekendDatesInRange(startDate!, selectedDate);
      onChange && onChange(dateRange, weekendDates);
    } else if (isWeekend(selectedDate)) {
      alert("Weekend dates cannot be selected.");
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const renderDays = (): JSX.Element[] => {
    const firstDay = startDayOfMonth(currentMonth, currentYear);
    const daysCount = daysInMonth(currentMonth, currentYear);

    const days: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysCount; day++) {
      const isCurrentDay =
        day === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();
      const isSelected =
        startDate &&
        endDate &&
        new Date(currentYear, currentMonth, day) >= startDate &&
        new Date(currentYear, currentMonth, day) <= endDate;
      const isStartSelected =
        startDate &&
        !endDate &&
        new Date(currentYear, currentMonth, day).getTime() ===
          startDate.getTime();
      const isWeekendDay = isWeekend(new Date(currentYear, currentMonth, day));

      const isWeekdaySelected =
        isSelected && !isWeekend(new Date(currentYear, currentMonth, day));

      days.push(
        <div
          key={day}
          className={`calendar-day ${isCurrentDay ? "current-day" : ""} ${
            isWeekdaySelected ? "selected" : ""
          } 
          ${isStartSelected ? "start-selected" : ""} ${
            isWeekendDay ? "weekend" : ""
          }`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handlePredefinedRangeClick = (
    getDateRange: () => [Date, Date]
  ): void => {
    const [startDate, endDate] = getDateRange();
    setStartDate(startDate);
    setEndDate(endDate);
    const weekendDates = getWeekendDatesInRange(startDate, endDate);
    onChange && onChange([startDate, endDate], weekendDates);
  };

  return (
    <div
      className="calendar-container"
      style={{ flex: selectedDateRange ? 1 : "" }}
    >
      <div className="calendar">
        <div className="calendar-body">
          <div className="calendar-nav">
            <button className="nav-button" onClick={prevMonth}>
              &lt;
            </button>
            <select
              className="custom-select"
              value={currentMonth}
              onChange={handleChangeMonth}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(currentYear, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select
              className="custom-select"
              value={currentYear}
              onChange={handleChangeYear}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={currentYear - 5 + i}>
                  {currentYear - 5 + i}
                </option>
              ))}
            </select>
            <button className="nav-button" onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div className="weekdays">
            {weekdays.map((day, index) => (
              <div
                key={index}
                style={{ color: index === 0 || index === 6 ? "red" : "black" }}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="days">{renderDays()}</div>

          <div className="predefined-ranges">
            {predefinedRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedRangeClick(range.getDateRange)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
