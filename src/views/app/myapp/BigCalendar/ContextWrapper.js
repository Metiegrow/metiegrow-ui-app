import React,{useState,useEffect} from 'react';

const ContextWrapper = () => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
        if (!showEventModal) {
          setSelectedEvent(null);
        }
      }, [showEventModal]);
  return (
    <GlobalContext.Provider
    value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchCalEvent,
      selectedEvent,
      setSelectedEvent,
      savedEvents,
      setLabels,
      labels,
      updateLabel,
      filteredEvents,
    }}
  >
    {props.children}
  </GlobalContext.Provider>
  );
}

export default ContextWrapper;
