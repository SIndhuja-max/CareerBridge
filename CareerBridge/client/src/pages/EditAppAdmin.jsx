import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAppData, updateApplication } from '../actions/AdminActions'
import { Loader } from '../components/Loader'

export const EditAppAdmin = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const { loading, applicationData } =
        useSelector(state => state.admin)

    const [status, setStatus] = useState("not")
    console.log("APPLICATION DATA:", applicationData)
    console.log("JOB:", applicationData?.job)
    console.log("APPLICANT:", applicationData?.applicant)

    useEffect(() => {

        dispatch(getAppData(id))

    }, [dispatch, id])

    const updateStatusHandler = () => {

        const data = {
            status
        }

        dispatch(updateApplication(id, data))

    }

    const toUpperFirst = (str = "") => {

        return (
            str.substring(0, 1).toUpperCase()
            +
            str.substring(1)
        )

    }

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

    const extractTime = (inputString) => {

        const dateTimeObj = new Date(inputString)

        const hours = dateTimeObj.getHours()

        const minutes = dateTimeObj.getMinutes()

        const seconds = dateTimeObj.getSeconds()

        const period =
            hours >= 12 ? 'PM' : 'AM'

        const hours12 =
            hours % 12 || 12

        return `${hours12
            .toString()
            .padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')} ${period}`

    }

    return (
        <>

            <MetaData title="Update Application" />

            <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>

                {
                    loading ? (

                        <Loader />

                    ) : (

                        <div>

                            <div className='md:pt-3 pt-12 text-2xl md:text-4xl'>

                                Application #{id}

                            </div>

                            {/* JOB DETAILS */}

                            <div className='pt-4 pb-3'>

                                <p className='text-2xl pb-2'>
                                    Job Details:
                                </p>

                                <ul>

                                    <li className='flex gap-4 items-center'>

                                        Role:

                                        <div>
                                            {applicationData?.job?.title}
                                        </div>

                                    </li>

                                    <li className='flex gap-4 items-center'>

                                        Company:

                                        <div>
                                            {applicationData?.job?.companyName}
                                        </div>

                                    </li>

                                    <li className='flex gap-4 items-center'>

                                        Location:

                                        <div>
                                            {applicationData?.job?.location}
                                        </div>

                                    </li>

                                    <li className='flex gap-4 items-center'>

                                        Experience:

                                        <div>
                                            {applicationData?.job?.experience}
                                        </div>

                                    </li>

                                </ul>

                            </div>

                            {/* APPLICANT DETAILS */}

                            <div className='pt-4 pb-6'>

                                <p className='text-2xl pb-2'>
                                    Applicant Details:
                                </p>

                                <ul>

                                    <li className='flex gap-4 items-center'>

                                        Name:

                                        <div>
                                            {applicationData?.applicant?.name}
                                        </div>

                                    </li>

                                    <li className='flex gap-4 items-center'>

                                        Email:

                                        <div>
                                            {applicationData?.applicant?.email}
                                        </div>

                                    </li>

                                    <li className='flex flex-col gap-3 pt-2'>

                                        <span className='font-semibold'>
                                            Resume:
                                        </span>

                                        {
                                            applicationData?.applicantResume?.url ? (

                                                <div className='flex gap-4 flex-wrap'>

                                                    <a
                                                        href={
                                                            applicationData
                                                                ?.applicantResume
                                                                ?.url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='blueCol px-5 py-2 rounded text-white'
                                                    >
                                                        View Resume
                                                    </a>

                                                    <a
                                                        href={
                                                            applicationData
                                                                ?.applicantResume
                                                                ?.url
                                                        }
                                                        download
                                                        className='bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded text-white'
                                                    >
                                                        Download Resume
                                                    </a>

                                                </div>

                                            ) : (

                                                <span className='text-red-400'>

                                                    No Resume Uploaded

                                                </span>

                                            )
                                        }

                                    </li>

                                </ul>

                            </div>

                            {/* STATUS */}

                            <div className='pt-2 pb-2'>

                                <div className='flex gap-3 items-center text-xl'>

                                    Status:

                                    <span
                                        className={`${applicationData?.status === "pending"
                                            ? "text-blue-600"
                                            : applicationData?.status === "rejected"
                                                ? "text-red-600"
                                                : "text-green-600"
                                            } font-medium`}
                                    >

                                        {
                                            toUpperFirst(
                                                applicationData?.status
                                            )
                                        }

                                    </span>

                                </div>

                            </div>

                            {/* UPDATE STATUS */}

                            <div className='py-4'>

                                <div className="flex gap-4">

                                    <div>

                                        <select
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                            id="large"
                                            className="block w-full px-6 py-3 text-base border bg-gray-900 border-gray-600 placeholder-gray-400 text-white"
                                        >

                                            <option value="not">

                                                Select Status

                                            </option>

                                            <option value="accepted">

                                                Accepted

                                            </option>

                                            <option value="rejected">

                                                Rejected

                                            </option>

                                        </select>

                                    </div>

                                    <button
                                        onClick={updateStatusHandler}
                                        className="blueCol py-2 px-6"
                                    >

                                        Update Status

                                    </button>

                                </div>

                            </div>

                            {/* CREATED AT */}

                            <div className='pt-2 pb-40'>

                                <div className='flex gap-3 items-center text-xl'>

                                    Application Created At:

                                    {
                                        applicationData?.createdAt &&
                                        `${convertDateFormat(
                                            applicationData.createdAt.substr(0, 10)
                                        )} on ${extractTime(applicationData.createdAt)}`
                                    }

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </>
    )

}