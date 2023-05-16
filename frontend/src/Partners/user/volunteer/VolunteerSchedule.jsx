import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box } from '@mui/material';
import Header from 'Venue/src/components/Header';
import FlexBetween from 'Venue/src/components/FlexBetween';
import { useParams } from 'react-router-dom';

const VolunteerSchedule = () => {
  const [opportunities, setOpportunities] = useState();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const localizer = momentLocalizer(moment);
  const [loading, setLoading] = useState(true);

  let { oppID } = useParams();
  oppID = oppID.toString();
  console.log(typeof oppID);
  useEffect(() => {
    axios
      .get(`/api/partners/opportunities/opportunity/${oppID}`)
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          setOpportunities(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSelectEvent = (event) => {
    setSelectedOpportunity(event);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <FlexBetween>
          <Header title="Event Calendar" />
        </FlexBetween>
        <Box mt={10}>
          <Calendar
            localizer={localizer}
            events={[
              {
                title: opportunities.name,
                start: new Date(opportunities.date),
                end: new Date(opportunities.date + 1 * 60 * 60 * 1000), // Adding 1 hour duration
              },
            ]}
            eventPropGetter={(event, start, end, isSelected) => {
              let backgroundColor = '#3174ad';

              if (event.status === 'approved') {
                backgroundColor = '#4caf50';
              } else if (event.status === 'pending') {
                backgroundColor = '#ff9800';
              } else if (event.status === 'rejected') {
                backgroundColor = '#f44336';
              }

              return {
                style: {
                  backgroundColor,
                  borderRadius: '0px',
                  opacity: 0.8,
                  color: 'white',
                  border: '0px',
                  display: 'block',
                },
              };
            }}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={() => setSelectedOpportunity(null)}
            startAccessor="start"
            endAccessor="end"
            //startAccessor={(event) => moment(event.start).toDate()}
            //endAccessor={(event) => moment(event.end).toDate()}
            defaultView="week"
            views={['week']}
            step={60}
            showMultiDayTimes
            style={{ height: 500 }}
          />
        </Box>
        {selectedOpportunity && (
          <div className="p-4 bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                {selectedOpportunity.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    Start Time:{' '}
                    {moment(selectedOpportunity.start).format(
                      'YYYY-MM-DD hh:mm A'
                    )}
                  </p>
                  <p className="text-gray-600">
                    End Time:{' '}
                    {moment(selectedOpportunity.end).format(
                      'YYYY-MM-DD hh:mm A'
                    )}
                  </p>
                  {/* <p className="text-gray-600">
                    Status: {selectedOpportunity.status}
                  </p> */}
                </div>
                <div>
                  {/* <p className="text-gray-600">Price: {selectedOpportunity.price}</p>
                  <p className="text-gray-600">
                    Venue: {selectedOpportunity.venue.name}
                  </p>
                  <p className="text-gray-600">
                    Organizer: {selectedOpportunity.organizer.name}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
      <Box>
        <FlexBetween></FlexBetween>
      </Box>
      <br></br>
    </Box>
  );
};

export default VolunteerSchedule;
