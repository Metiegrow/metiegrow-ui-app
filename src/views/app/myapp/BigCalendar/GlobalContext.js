import React from "react";

const GlobalContext = React.createContext({
 
 
 
  showEventModal: false,
  setShowEventModal: () => {},

  selectedEvent: null,
  setSelectedEvent: () => {},
 
});

export default GlobalContext;
