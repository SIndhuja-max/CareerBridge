import React from 'react'
import { MetaData } from '../components/MetaData'
import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'

export const MyProfile = () => {
  const { loading, me } = useSelector((state) => state.user)
  const [opened, { open, close }] = useDisclosure(false)

  const convertDateFormat = (inputDate) => {
    if (!inputDate) return ""

    const parts = inputDate.split('-')

    if (parts.length !== 3) {
      return "Invalid date format"
    }

    const day = parts[2]
    const month = parts[1]
    const year = parts[0]

    return `${day}-${month}-${year}`
  }

  /*
  SAFE RESUME URL

  Problem:
  Sometimes me.resume exists but url is empty / undefined

  Fix:
  Resume button + modal should only work if valid URL exists
  */

  const resumeUrl = me?.resume?.url || ""

  return (
    <>
      <MetaData title="My Profile" />

      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {
          loading ? (
            <Loader />
          ) : (
            <>
              <div className='text-left text-3xl underL absolute pl-4 underline-offset-8 md:pt-6 pt-3'>
                <span className='font-medium'>
                  My Profile
                </span>
              </div>

              <div className='flex md:flex-row md:gap-12 flex-col md:justify-around justify-center items-top md:pt-12 min-h-[90vh]'>

                {/* LEFT SIDE */}

                <div className='md:w-1/2 w-full pt-16 md:pt-10 gap-8 flex flex-col justify-start items-center'>
                  <div className='w-72 h-72 flex justify-center items-center'>
                    <img
                      src={me?.avatar?.url}
                      className='rounded-full w-full h-full object-cover'
                      alt="profile"
                    />
                  </div>

                  <div className='flex justify-center items-center'>
                    <Link
                      to="/editProfile"
                      className='blueCol px-10 py-2 font-semibold'
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>

                {/* RIGHT SIDE */}

                <div className='md:w-1/2 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                  <div className='flex flex-col md:gap-5 gap-6'>

                    {/* NAME */}

                    <div>
                      <p className='md:text-2xl text-xl'>
                        Full Name
                      </p>

                      <p className='md:text-xl pt-1 text-lg'>
                        {me?.name}
                      </p>
                    </div>

                    {/* EMAIL */}

                    <div>
                      <p className='md:text-2xl text-xl'>
                        Email
                      </p>

                      <p className='md:text-xl pt-1 text-lg'>
                        {me?.email}
                      </p>
                    </div>

                    {/* ACCOUNT TYPE */}

                    <div>
                      <p className='md:text-2xl text-xl'>
                        Account Type
                      </p>

                      <p className='md:text-xl pt-1 text-lg capitalize'>
                        {me?.role === "admin" ? "Recruiter" : "Applicant"}
                      </p>
                    </div>

                    {/* JOINED DATE */}

                    <div>
                      <p className='md:text-2xl text-xl'>
                        Joined On
                      </p>

                      <p className='md:text-xl pt-1 text-lg'>
                        {
                          me?.createdAt
                            ? convertDateFormat(me.createdAt.substr(0, 10))
                            : ""
                        }
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}

                    <div className='flex md:flex-row flex-col md:gap-8 pt-4 gap-3'>

                      {/* LEFT ACTIONS */}

                      <ul className='flex flex-col gap-4'>

                        {/* APPLICANT ONLY → RESUME */}

                        {
                          me?.role === "applicant" && resumeUrl && (
                            <li>
                              <button
                                onClick={open}
                                className='blueCol w-2/3 md:w-full font-medium px-6 py-1'
                              >
                                My Resume
                              </button>
                            </li>
                          )
                        }

                        {/* IF RESUME MISSING */}

                        {
                          me?.role === "applicant" && !resumeUrl && (
                            <li>
                              <button
                                disabled
                                className='bg-gray-700 cursor-not-allowed w-2/3 md:w-full font-medium px-6 py-1'
                              >
                                Resume Not Uploaded
                              </button>
                            </li>
                          )
                        }


                        {/* APPLICANT ONLY */}

                        {
                          me?.role === "applicant" && (
                            <>
                              <li>
                                <Link to="/applied">
                                  <button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>
                                    My Applications
                                  </button>
                                </Link>
                              </li>

                              
                            </>
                          )
                        }
                      </ul>

                      {/* RIGHT ACTIONS */}

                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link to="/changePassword">
                            <button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>
                              Change Password
                            </button>
                          </Link>
                        </li>

                        <li>
                          <Link to="/deleteAccount">
                            <button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>
                              Delete Account
                            </button>
                          </Link>
                        </li>
                      </ul>

                    </div>
                  </div>
                </div>

                {/* RESUME MODAL */}

                {
                  resumeUrl && (
                    <Modal
                      opened={opened}
                      onClose={close}
                      title="My Resume"
                      size="lg"
                    >
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-gray-600">
                          Click below to view or download your uploaded resume.
                        </p>

                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="blueCol text-center px-6 py-2 font-medium"
                        >
                          Open Resume
                        </a>
                      </div>
                    </Modal>
                  )
                }

              </div>
            </>
          )
        }
      </div>
    </>
  )
}