import { HiOutlineMenu } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { RegistrationOpenContext } from '../../App';

const AllEventsHeader = (props) => {
  //   const { registration } = useContext(RegistrationOpenContext);

  const [burgerNav, setBurgerNav] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const navigate = useNavigate();
  const burgerNavController = () => {
    document.querySelector('html').style.overflowY = !burgerNav
      ? 'hidden'
      : 'auto';
    setBurgerNav(!burgerNav);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
  };

  //   const handleBurgerNavItemClick = (path) => {
  //     document.getElementById(path).scrollIntoView({ behavior: 'smooth' });
  //     burgerNavController();
  //   };

  const navItems = [
    {
      name: 'All Events',
      path: "/events",
    },
    {
      name: 'My Events',
      path: 'calendar',
    },
    {
      name: 'Profile',
      path: `/events/${props.id}/frame`,
    },
    {
      name: 'Log Out',
      path: '/',
    },
  ];

  return (
    <div>
      <div
        className={"w-full flex flex-col md:flex-row justify-between items-center p-5 py-4 fixed top-0 z-50 backdrop-blur-[5px] border-b border-white/10"}
      >
        <div className="w-full md:w-5/12 pl-2 md:pl-12">
          <img src="/assets/UNIEVENTPRO.svg" className="w-15 h-15" alt="logo" />
        </div>
        <div className="hidden lg:flex justify-between items-center w-full max-w-4xl">
          {navItems.map((item) => {
            return (
              <div>
                <span
                  className="px-2 text-nav-links-unselected hover:text-primary transition duration-300 cursor-pointer"
                  onClick={() => handleNavItemClick(item.path)}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
          <div className="flex col col-span-20 pr-7 pl-2">
            {/* {registration ? (
              <a
                class="py-1 px-3 mr-[1.6rem] bg-[#D9D9D9] rounded-sm justify-center items-center text-sm font-normal hover:text-white hover:bg-primary transition duration-300 cursor-pointer"
                href="https://portal.bashaway.sliitfoss.org/register"
                target="_blank"
              >
                Register
              </a>
            ) : (
              <button
                class="flex px-2 mr-6 rounded-sm justify-center items-center text-sm font-normal bg-primary cursor-pointer"
                target="_blank"
                disabled
              >
                <span className="flex items-center">
                  <img
                    src="/assets/lock.svg"
                    alt=""
                    className="p-1 rounded-md text-xs"
                  />
                  <p className="p-1 mt-0.5">Register</p>
                </span>
              </button>
            )} */}
            {/* 
            <button
              class="flex justify-center items-center py-1 px-3 bg-[#D9D9D9] rounded-sm text-sm font-normal hover:text-white hover:bg-primary transition duration-300 cursor-pointer"
              onClick={() => {
                document.querySelector('html').style.overflowY = 'hidden';
                setShowSocial(true);
              }}
            >
              <span className="line-clamp-1">Join the WhatsApp Group</span>{' '}
              <BsWhatsapp className="ml-2" />
            </button> */}

            {/* <WhatsappModal showModal={showSocial} toggleShow={setShowSocial} /> */}
          </div>
        </div>
        <HiOutlineMenu
          className="fixed top-0 h-8 w-8 text-black right-1 lg:hidden mt-[0.8rem] lg:mt-4 mr-4 lg:mr-2 cursor-pointer"
          onClick={burgerNavController}
        />
      </div>
      <div>
        <nav
          className={`h-full w-full flex items-center fixed top-0 left-0 z-50 ${
            burgerNav ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
          } bg-black/50 backdrop-blur-2xl transition duration-300`}
        >
          <IoIosClose
            className="fixed top-0 right-0 z-[60] h-14 w-14 text-black mt-2 mr-2 lg:hidden cursor-pointer"
            onClick={burgerNavController}
          />
          <ul className=" mr-auto w-full h-full flex-col flex items-center uppercase justify-center p-8 lg:hidden">
            <li className="h-full flex flex-col justify-between py-20">
              {navItems.map((item) => {
                return (
                  <div className="w-full flex flex-col justify-center items-center">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="w-full text-white hover:text-primary text-center transition duration-300"
                      //   onClick={() => handleBurgerNavItemClick(item.path)}
                    >
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden lg:flex w-full h-[0.25px] bg bg-nav-links-unselected opacity-20"></div>
    </div>
  );
};

export default AllEventsHeader;
