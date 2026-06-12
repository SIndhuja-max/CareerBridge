import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from '@mantine/core';
import { FaBars } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { MdDeleteForever } from 'react-icons/md';

import {
  MdOutlineBusinessCenter,
  MdOutlineDashboard
} from 'react-icons/md';

import {
  FaUserCircle,
  FaSave
} from 'react-icons/fa';

import { MdDoneAll } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';

import { toast } from 'react-toastify';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import { logOrNot } from '../actions/UserActions';

import { useNavigate } from 'react-router-dom';

import { logoutClearState } from '../slices/UserSlice';

import useIsMobile from '../hooks/useIsMobile';

export const Navbar = () => {

  const { isLogin, me } = useSelector(
    state => state.user
  );

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const LogOut = () => {

    localStorage.removeItem('userToken');

    localStorage.removeItem('role');

    dispatch(logOrNot());

    dispatch(logoutClearState());

    toast.success("Logout Successful!");

    navigate('/');

  };

  return (

    <>

      <div className='
      text-white
      z-20
      fixed
      min-w-full
      bg-gray-950
      '>

        {/* DESKTOP NAVBAR */}

        {

          !isMobile && (

            <div className='
            max-w-7xl
            mx-auto
            flex
            justify-between
            items-center
            px-8
            py-4
            font-semibold
            text-lg
            '>

              {/* LOGO */}

              <Link
                to="/"
                className='
                flex
                justify-center
                items-center
                titleT
                tracking-wide
                '
              >

                <MdOutlineBusinessCenter size={19} />

                CAREERBRIDGE

              </Link>

              {/* CENTER NAV LINKS */}

              <div className='
              flex
              items-center
              gap-10
              '>

                <Link
                  to="/"
                  className='cool-link'
                >
                  Home
                </Link>

                <Link
                  to="/jobs"
                  className='cool-link'
                >
                  Jobs
                </Link>

                <Link
                  to="/contact"
                  className='cool-link'
                >
                  Contact
                </Link>

                <Link
                  to="/about"
                  className='cool-link'
                >
                  About
                </Link>

                {

                  isLogin &&

                  ['recruiter', 'admin']
                    .includes(me?.role) && (

                      <Link
                        to="/admin/dashboard"
                        className='cool-link'
                      >

                        Dashboard

                      </Link>

                    )

                }

              </div>

              {/* RIGHT SECTION */}

              {

                isLogin ? (

                  <Menu
                    shadow="md"
                    width={220}
                  >

                    <Menu.Target>

                      <Avatar
                        className='cursor-pointer'
                        radius="xl"
                        src={me?.avatar?.url}
                        alt="profile"
                      />

                    </Menu.Target>

                    <Menu.Dropdown>

                      <Link to="/profile">

                        <Menu.Item
                          icon={
                            <FaUserCircle size={14} />
                          }
                        >

                          My Profile

                        </Menu.Item>

                      </Link>

                      {

                        me.role === "applicant" && (

                          <>

                            <Link to="/applied">

                              <Menu.Item
                                icon={
                                  <MdDoneAll size={14} />
                                }
                              >

                                Applied Jobs

                              </Menu.Item>

                            

                                

                              

                            </Link>

                          </>

                        )

                      }

                      {

                        ['recruiter', 'admin']
                          .includes(me?.role) && (

                            <Link to="/admin/dashboard">

                              <Menu.Item
                                icon={
                                  <MdOutlineDashboard size={14} />
                                }
                              >

                                Dashboard

                              </Menu.Item>

                            </Link>

                          )

                      }

                      <Menu.Divider />

                      <Link to="/deleteAccount">

                        <Menu.Item
                          color="red"
                          icon={
                            <MdDeleteForever size={14} />
                          }
                        >

                          Delete Account

                        </Menu.Item>

                      </Link>

                      <Menu.Item
                        onClick={LogOut}
                        icon={
                          <RiLogoutBoxFill size={14} />
                        }
                      >

                        Logout

                      </Menu.Item>

                    </Menu.Dropdown>

                  </Menu>

                ) : (

                  <span className='
                  flex
                  gap-3
                  items-center
                  '>

                    <Link
                      to="/login"
                      className='
                      text-sm
                      px-4
                      py-1
                      rounded-xl
                      blueCol
                      '
                    >

                      Login

                    </Link>

                    <Link
                      to="/register"
                      className='
                      text-sm
                      px-4
                      py-1
                      rounded-xl
                      blueCol
                      '
                    >

                      Register

                    </Link>

                  </span>

                )

              }

            </div>

          )

        }

        {/* MOBILE NAVBAR */}

        <div className='
        py-3
        px-3
        md:hidden
        justify-between
        items-center
        flex
        '>

          <Link
            to="/"
            className='
            text-lg
            titleT
            flex
            justify-center
            items-center
            gap-1
            '
          >

            <MdOutlineBusinessCenter size={19} />

            CAREERBRIDGE

          </Link>

          <div className='flex items-center'>

            <div className='pr-10'>

              {

                isLogin ? (

                  <Menu
                    shadow="md"
                    width={200}
                  >

                    <Menu.Target>

                      <Avatar
                        size={28}
                        className='cursor-pointer'
                        radius="xl"
                        src={me?.avatar?.url}
                        alt="profile"
                      />

                    </Menu.Target>

                    <Menu.Dropdown>

                      <Link to="/profile">

                        <Menu.Item
                          icon={
                            <FaUserCircle size={14} />
                          }
                        >

                          My Profile

                        </Menu.Item>

                      </Link>

                      {

                        ['recruiter', 'admin']
                          .includes(me?.role) && (

                            <Link to="/admin/dashboard">

                              <Menu.Item
                                icon={
                                  <MdOutlineDashboard size={14} />
                                }
                              >

                                Dashboard

                              </Menu.Item>

                            </Link>

                          )

                      }

                      <Link to="/applied">

                        <Menu.Item
                          icon={
                            <MdDoneAll size={14} />
                          }
                        >

                          Applied Jobs

                        </Menu.Item>

                      </Link>

                      <Link to="/saved">

                        <Menu.Item
                          icon={
                            <FaSave size={14} />
                          }
                        >

                        

                        </Menu.Item>

                      </Link>

                      <Menu.Divider />

                      <Link to="/deleteAccount">

                        <Menu.Item
                          color="red"
                          icon={
                            <MdDeleteForever size={14} />
                          }
                        >

                          Delete Account

                        </Menu.Item>

                      </Link>

                      <Menu.Item
                        onClick={LogOut}
                        icon={
                          <RiLogoutBoxFill size={14} />
                        }
                      >

                        Logout

                      </Menu.Item>

                    </Menu.Dropdown>

                  </Menu>

                ) : null

              }

            </div>

            <div>

              {

                toggle ? (

                  <RxCross1
                    size={24}
                    className='cursor-pointer'
                    onClick={() =>
                      setToggle(false)
                    }
                  />

                ) : (

                  <FaBars
                    size={24}
                    className='cursor-pointer'
                    onClick={() =>
                      setToggle(true)
                    }
                  />

                )

              }

            </div>

          </div>

        </div>

        {
  toggle && (

    <div className='
    md:hidden
    bg-gray-950
    text-white
    px-6
    pb-6
    flex
    flex-col
    gap-5
    text-lg
    font-medium
    absolute
top-[72px]
left-0
w-full
z-50
shadow-2xl
border-t
border-gray-800
    '>

      <Link
        to="/"
        onClick={() => setToggle(false)}
        className='cool-link'
      >
        Home
      </Link>

      <Link
        to="/jobs"
        onClick={() => setToggle(false)}
        className='cool-link'
      >
        Jobs
      </Link>

      <Link
        to="/contact"
        onClick={() => setToggle(false)}
        className='cool-link'
      >
        Contact
      </Link>

      <Link
        to="/about"
        onClick={() => setToggle(false)}
        className='cool-link'
      >
        About
      </Link>

      {

        isLogin
        &&
        ['recruiter', 'admin']
          .includes(me?.role) && (

            <Link
              to="/admin/dashboard"
              onClick={() => setToggle(false)}
              className='cool-link'
            >

              Dashboard

            </Link>

          )

      }

      {

        !isLogin && (

          <div className='
          flex
          gap-4
          pt-2
          '>

            <Link
              to="/login"
              onClick={() => setToggle(false)}
              className='
              text-sm
              px-4
              py-2
              rounded-xl
              blueCol
              '
            >

              Login

            </Link>

            <Link
              to="/register"
              onClick={() => setToggle(false)}
              className='
              text-sm
              px-4
              py-2
              rounded-xl
              blueCol
              '
            >

              Register

            </Link>

          </div>

        )

      }

    </div>

  )
}
        <div className='
        bg-white
        border-b
        md:mx-16
        mx-3
        '>

        </div>

      </div>

    </>

  );

};