import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { MetaData } from '../components/MetaData'
import { Loader } from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleJob, saveJob } from '../actions/JobActions'
import { BiBriefcase, BiBuildings, BiRupee } from 'react-icons/bi'
import { HiStatusOnline } from 'react-icons/hi'
import { BsPersonWorkspace, BsSend } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const JobDetails = () => {

  const dispatch = useDispatch()

  const {
    jobDetails,
    loading,
    saveJobLoading
  } = useSelector(state => state.job)

  const {
    me,
    isLogin
  } = useSelector(state => state.user)

  const { id } = useParams()

  const navigate = useNavigate()

  /*
  CHECK ALREADY APPLIED
  */

  const [alreadyApplied, setAlreadyApplied] = useState(false)

  /*
  GET JOB DETAILS
  */

  useEffect(() => {

    dispatch(getSingleJob(id))

  }, [dispatch, id])

  /*
  CHECK APPLICATION STATUS
  */

  useEffect(() => {

    const checkApplication = async () => {

      try {

        const response = await fetch(
          "https://careerbridge-backend-94u7.onrender.com/api/v1/getAllApplication",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
          }
        )

        const data = await response.json()

        const applied = data.allApplications.some(
          (app) => app?.job?._id === id
        )

        setAlreadyApplied(applied)

      }

      catch (err) {

        console.log(err)

      }

    }

    if (
      isLogin &&
      !["recruiter", "admin"].includes(me?.role)
    ) {

      checkApplication()

    }

  }, [id, isLogin, me?.role])

  /*
  DATE FORMAT
  */

  const convertDateFormat = (inputDate) => {

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
  SAVE JOB
  */

  const saveJobHandler = () => {

    dispatch(saveJob(id))

  }

  /*
  NOT LOGIN
  */

  const notLoginHandler = (str) => {

    if (!isLogin) {

      toast.info(`Please login to ${str} job`)
      navigate("/login")

    }

  }

  return (
    <>

      <MetaData title="Job Details" />

      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 text-white'>

        {
          loading ?

            <Loader />

            :

            <>
              {
                jobDetails &&

                <div>

                  {/* TOP SECTION */}

                  <div className='flex pt-5 md:px-12 pl-4 md:gap-10 gap-5'>

                    <div className='flex items-center w-[6rem]'>

                      <img
                        src={jobDetails.companyLogo?.url}
                        className=''
                        alt=""
                      />

                    </div>

                    <div className='flex flex-col gap-2 md:pt-2'>

                      <p className='text-xl flex gap-1 items-center md:text-3xl'>
                        <BiBriefcase />
                        {jobDetails.title}
                      </p>

                      <p className='text-lg flex gap-1 items-center md:text-2xl'>
                        <BiBuildings />
                        {jobDetails.companyName}
                      </p>

                      <p className='text-lg flex gap-2 items-center md:text-2xl'>
                        <BsPersonWorkspace size={20} />
                        {jobDetails.employmentType}
                      </p>

                      <p className='text-lg flex gap-1.5 items-center md:text-2xl'>

                        <HiStatusOnline size={20} />

                        <span
                          className={` ${jobDetails.status === "active"
                              ? "text-green-700"
                              : "text-red-500"
                            } 
                  w-20 text-center rounded-lg font-semibold`}
                        >
                          {jobDetails.status}
                        </span>

                      </p>

                    </div>

                  </div>

                  <div className='border-b pt-2 pb-3 md:mx-12 mx-4'></div>

                  {/* DETAILS */}

                  <div className='md:px-12 pl-4'>

                    <div>

                      <p className='text-2xl py-3 '>
                        Details:
                      </p>

                    </div>

                    <div>

                      <ul className='flex flex-col gap-3'>

                        <li className='flex items-center gap-3'>
                          Posted By:
                          <div>{jobDetails.postedBy?.name}</div>
                        </li>

                        <li className='flex items-center gap-3'>
                          Posted At:
                          <div>
                            {convertDateFormat(jobDetails.createdAt.substr(0, 10))}
                          </div>
                        </li>

                        <li className='flex items-center gap-3'>
                          Location:
                          <div>{jobDetails.location}</div>
                        </li>

                        <li className='flex items-center gap-3'>

                          Salary:

                          <div className='flex items-center'>
                            <BiRupee />
                            <span>
                              {(jobDetails.salary / 100000).toFixed(0)} LPA
                            </span>
                          </div>

                        </li>

                        <li className='flex items-center gap-3'>
                          Experience:
                          <div>{jobDetails.experience}</div>
                        </li>

                        <li className='flex items-center gap-3'>

                          Skills Required:

                          <div className='flex flex-wrap items-center gap-3'>

                            {
                              jobDetails.skillsRequired?.map((e, i) => (

                                <span
                                  key={i}
                                  className='px-2 py-0.5 bg-yellow-600 rounded text-black md:text-sm font-semibold text-xs'
                                >
                                  {e}
                                </span>

                              ))
                            }

                          </div>

                        </li>

                        <li className='grid gird-cols-1 gap-2 pt-2'>

                          <div className='text-2xl'>
                            Job Description:
                          </div>

                          <div>
                            {jobDetails.description}
                          </div>

                        </li>

                      </ul>

                    </div>

                  </div>

                  {/* APPLY BUTTON */}

                  <div className='md:px-12 pl-4 flex gap-8 pb-32 pt-6'>

                    <button

                      onClick={() => {

                        if (!isLogin) {

                          notLoginHandler("apply")
                          return

                        }

                        if (
                          ["recruiter", "admin"]
                          .includes(me?.role)
                        ) {

                          toast.error("Recruiters cannot apply for jobs")
                          return

                        }

                        if (alreadyApplied) {

                          toast.error("You already applied for this job")
                          return

                        }

                        navigate(`/Application/${jobDetails._id}`)

                      }}

                      disabled={
                        alreadyApplied ||
                        ["recruiter", "admin"]
                        .includes(me?.role)
                      }

                      className={`md:text-lg text-sm font-bold px-10 py-1.5 flex items-center gap-1
                      
                      ${
                        alreadyApplied
                          ? "bg-blue-700 cursor-not-allowed"
                          : ["recruiter", "admin"]
                              .includes(me?.role)
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-green-800 hover:bg-green-600"
                      }`}
                    >

                      <BsSend />

                      {
                        alreadyApplied
                          ? "Applied"
                          : ["recruiter", "admin"]
                              .includes(me?.role)
                            ? "Access Denied for Recruiters"
                            : "Apply Now"
                      }

                    </button>

                  </div>

                </div>
              }
            </>
        }

      </div>

    </>
  )
}