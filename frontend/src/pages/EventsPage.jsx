import React from "react";
import Header from "../components/layout/Header";
import EventCard from "../components/Event/EventCard";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
};

export default EventsPage;
