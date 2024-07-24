import React from "react";

const TimestampConverter = ({ timeStamp, format }) => {
  const formatDateTime = () => {
    const time = new Date(parseInt(timeStamp, 10));
    const Hours = String(time.getHours() % 12 || 12).padStart(2, "0");
    const Minutes = String(time.getMinutes()).padStart(2, "0");
    const Period = time.getHours() < 12 ? "am" : "pm";
    const MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const Month = MonthNames[time.getMonth()];
    const Day = time.getDate();
    const Year = time.getFullYear();

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return <>{day}<sup>th</sup></>;
      switch (day % 10) {
        case 1: return <>{day}<sup>st</sup></>;
        case 2: return <>{day}<sup>nd</sup></>;
        case 3: return <>{day}<sup>rd</sup></>;
        default: return <>{day}<sup>th</sup></>;
      }
    };
    

    const isToday = () => {
      const today = new Date();
      return (
        today.getDate() === time.getDate() &&
        today.getMonth() === time.getMonth() &&
        today.getFullYear() === time.getFullYear()
      );
    };

    const isYesterday = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return (
        yesterday.getDate() === time.getDate() &&
        yesterday.getMonth() === time.getMonth() &&
        yesterday.getFullYear() === time.getFullYear()
      );
    };

    switch (format) {
      case "time":
        return `${Hours}:${Minutes} ${Period}`;
      case "datetime":
        if (isToday()) {
          return `Today ${Hours}:${Minutes} ${Period}`;
        }
        if (isYesterday()) {
          return `Yesterday ${Hours}:${Minutes} ${Period}`;
        }
        return (
          <span>
            {getDayWithSuffix(Day)} {Month} {Year} {Hours}:{Minutes} {Period}
          </span>
        );
      case "date":
        if (isToday()) {
          return "Today";
        }
        if (isYesterday()) {
          return "Yesterday";
        }
        return (
          <span>
            {getDayWithSuffix(Day)} {Month} {Year}
          </span>
        );
      default:
        return "Invalid format";
    }
  };

  const formattedDateTime = formatDateTime();

  return <span>{formattedDateTime}</span>;
};

// <TimestampConverter timeStamp={timestamp} format="time" />   For Time only
// <TimestampConverter timeStamp={timestamp} format="datetime" />   For Date and Time
// <TimestampConverter timeStamp={timestamp} format="date" />   For Date only

export default TimestampConverter;
