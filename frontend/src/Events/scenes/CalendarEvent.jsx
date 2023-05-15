import React from 'react';
import { createEvent } from 'ics';
import { saveAs } from 'file-saver';
import { useState, useEffect, useRef } from 'react';
import eventService from 'Events/event.service';

export default function CalendarEvent(id) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  // Set up event schedule details
  const calendarEvent = {
    start: [2018, 5, 30, 6, 30],
    duration: { hours: 6, minutes: 30 },
    title: 'Bolder Boulder',
    description: 'Annual 10-kilometer run in Boulder, Colorado',
    location: 'Folsom Field, University of Colorado (finish line)',
    url: 'http://www.bolderboulder.com/',
    geo: { lat: 40.0095, lon: 105.2669 },
    categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
    attendees: [],
  };

  const handleSave = () => {
    createEvent(calendarEvent, (error, value) => {
      const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'event-schedule.ics');
    });
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        onClick={handleSave}
      >
        Save your schedule
      </button>
    </div>
  );
}
