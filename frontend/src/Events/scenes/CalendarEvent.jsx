import React from 'react';
import { createEvent } from 'ics';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { Button, Typography } from '@mui/material';

export default function CalendarEvent(props) {
  console.log(props.name);
  // Set up event schedule details

  const formattedStartDate = moment(props.startTime).format('YYYY, M, D, H, m');
  const formattedEndDate = moment(props.startTime).format('YYYY, M, D, H, m');
  const startDateArray = formattedStartDate.split(',').map(Number);
  const endDateArray = formattedEndDate.split(',').map(Number);

  const calendarEvent = {
    start: startDateArray,
    end: endDateArray,
    title: props.name,
    description: props.description,
    // location: null,
    // url: null,
    // geo: null,
    // categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    // status: props.status,
    // busyStatus: null,
    // organizer: { name: props.org, email: 'foss@gmail.com' },
    // attendees: [],
  };

  const handleSave = () => {
    createEvent(calendarEvent, (error, value) => {
      const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${props.name}-calendar.ics`);
    });
  };

  return (
    <div className="mt-8">
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Save to Your Schedule
      </Button>
    </div>
  );
}
