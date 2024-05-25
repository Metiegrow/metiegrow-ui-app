import React from "react";

const TimestampConverter = ({ timeStamp, format }) => {
  const formatDateTime = () => {
    const time = new Date(parseInt(timeStamp, 10));
    const Hours = String(time.getHours() % 12 || 12).padStart(2, "0");
    const Minutes = String(time.getMinutes()).padStart(2, "0");
    const Period = time.getHours() < 12 ? "AM" : "PM";
    const Month = String(time.getMonth() + 1).padStart(2, "0");
    const Day = String(time.getDate()).padStart(2, "0");
    const Year = time.getFullYear();

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
        return `${Day}.${Month}.${Year} ${Hours}:${Minutes} ${Period}`;
      case "date":
        if (isToday()) {
          return "Today";
        }
        if (isYesterday()) {
          return "Yesterday";
        }
        return `${Day}.${Month}.${Year}`;
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
