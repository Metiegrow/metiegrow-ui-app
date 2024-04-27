import React from "react";

const TimestampConverter = ({ timeStamp, format }) => {
  const formatDateTime = () => {
    const time = new Date(parseInt(timeStamp, 10));
    const Hours = time.getHours() % 12 || 12;
    const Minutes = String(time.getMinutes()).padStart(2, "0");
    const Period = time.getHours() < 12 ? "AM" : "PM";
    const Month = time.getMonth() + 1;
    const Day = time.getDate();
    const Year = time.getFullYear();

    switch (format) {
      case "time":
        return `${Hours}:${Minutes} ${Period}`;
      case "datetime":
        return `${Day}/${Month}/${Year}  ${Hours}:${Minutes} ${Period}`;
      case "date":
        return `${Day}/${Month}/${Year}`;
      default:
        return "Invalid format";
    }
  };

  const formattedDateTime = formatDateTime();

  return <span>{formattedDateTime}</span>;
};

// Example usage:
// <TimestampConverter timeStamp={timestamp} format="time" />   For Time only
// <TimestampConverter timeStamp={timestamp} format="datetime" />   For Date and Time
// <TimestampConverter timeStamp={timestamp} format="date" />   For Date only

export default TimestampConverter;
