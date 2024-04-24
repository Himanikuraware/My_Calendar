export const predefinedRanges = [
  {
    label: "Last 7 days",
    getDateRange: (): [Date, Date] => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      return [startDate, endDate];
    },
  },
  {
    label: "Last 30 days",
    getDateRange: (): [Date, Date] => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      return [startDate, endDate];
    },
  },
];

export interface PredefinedRange {
  label: string;
  getDateRange: () => [Date, Date];
}

export interface MyCalendarProps {
  selectedDateRange: [Date, Date] | null;
  currentDate?: Date;
  onChange?: (dateRange: [Date, Date], weekendDates: Date[]) => void;
  predefinedRanges?: PredefinedRange[];
}

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];