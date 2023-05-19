import { Button } from '@mui/material';
import Title from './Title';

const Actions = () => {
  const prizeList = [
    {
      name: 'Register',
      image: 'SignUp.svg',
      details: ['Register for the event', 'and get notified'],
    },
    {
      name: 'Add to Calendar',
      image: 'CalendarBlue.svg',
      details: [
        'Add the Event to you favorite calendar',
        ' app and never miss the event!',
      ],
    },
    {
      name: 'Create a Badge',
      image: 'ProfileBadge.svg',
      details: ['Create a badge to show your', 'support for the event!'],
    },
    {
      name: 'View Opportunities',
      image: 'VolunteerOpportunities.svg',
      details: ['View the opportunities', 'available for the event!'],
    },
  ];

  const Prize = ({ name, details, image, aos }) => {
    return (
      <div data-aos={aos}>
        <div className="h-96 group flex flex-col justify-center items-center my-12 border cursor-default border-nav-links-unselected mx-6 md:mx-12 p-8 hover:border-blue transition duration-300 ">
          <img
            src={`/assets/${image}`}
            alt="Actions"
            className="w-52 h-52 md:w-52 md:h-52 mx-16 p-2  flex justify-center items-center transform hover:scale-105 transition duration-300"
          />
          <span className="text-white text-xl font-semibold text-center mt-8 mb-6">
            {name}
          </span>
          {details.map((detail) => {
            return (
              <span
                key={detail}
                className="text-nav-links-unselected text-center mb-2"
              >
                {detail}
              </span>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className="flex flex-col justify-center items-center  pt-[80px] "
        id="prizes"
      >
        <Title title="Get Involved" className="mt-4 mb-12" aos="fade-right" />
        <div className="flex flex-wrap justify-center items-center">
          {prizeList.map((prize, index) => {
            return (
              <Prize
                onClick={() => console.log('hello')}
                key={prize}
                name={prize.name}
                details={prize.details}
                image={prize.image}
                aos={
                  index === 1
                    ? 'fade'
                    : index === 0
                    ? 'fade-right'
                    : 'fade-left'
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Actions;
