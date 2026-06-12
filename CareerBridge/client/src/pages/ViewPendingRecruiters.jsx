import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import axios from 'axios'

export const ViewPendingRecruiters = () => {

  const { loading } = useSelector(
    state => state.admin
  )

  const [recruiters, setRecruiters] = useState([])
  const [actionLoading, setActionLoading] = useState(" ")

  useEffect(() => {

    const fetchRecruiters = async () => {

      try {

        const token = localStorage.getItem("userToken")

        const { data } = await axios.get(

          "https://careerbridge-backend-94u7.onrender.com/api/v1/admin/recruiters",

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
   

        if (data.success) {

          setRecruiters(data.recruiters)

        }

      }

      catch (err) {

        

      }

    }

    fetchRecruiters()

  }, [])

  /*
  DELETE HANDLER
  */

  const approveRecruiterHandler = async (id) => {
    setActionLoading(id)

  try {

    const token = localStorage.getItem("userToken")

    await axios.put(

      `https://careerbridge-backend-94u7.onrender.com/api/v1/admin/approveRecruiter/${id}`,

      {},

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    )
    setActionLoading(" ")

    setRecruiters(
      recruiters.filter(
        recruiter => recruiter._id !== id
      )
    )

  }

  catch (err) {

    setActionLoading(" ")

  }

}

const rejectRecruiterHandler = async (id) => {
  setActionLoading(id)

  try {

    const token = localStorage.getItem("userToken")

    await axios.put(

      `https://careerbridge-backend-94u7.onrender.com/api/v1/admin/rejectRecruiter/${id}`,

      {},

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    )
    setActionLoading(" ")

    setRecruiters(
      recruiters.filter(
        recruiter => recruiter._id !== id
      )
    )

  }

  catch (err) {
    setActionLoading(" ")
    

  }

}

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

  return (

    <>

      <MetaData title="Pending Recruiters" />

      <div className='
      bg-gray-950
      min-h-screen
      pt-20
      md:px-20
      px-3
      text-white
      '>

        {
          loading

            ? <Loader />

            : <div>

              {/* HEADING */}

              <div>

                <p className='
                text-center
                pt-3
                pb-6
                text-3xl
                font-medium
                '>

                  Pending Recruiter Verification

                </p>

              </div>

              {/* EMPTY STATE */}

              {
                recruiters.length === 0 &&

                <div className='
                text-center
                text-gray-400
                pt-10
                text-lg
                '>

                  No pending recruiters found

                </div>
              }

              {/* TABLE */}

              {
                recruiters.length > 0 &&

                <div className="
                relative
                pb-24
                overflow-x-auto
                scrollbar-hide
                w-full
                max-w-full
                shadow-md
                rounded-2xl
                ">

                  <table className="
                  min-w-[900px]
                  w-full
                  text-sm
                  text-left
                  text-white
                  ">

                    <thead className="
                    text-xs
                    text-gray-200
                    uppercase
                    blueCol
                    ">

                      <tr>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          User Id
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          Email
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          Created On
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3"
                        >
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        recruiters

                          .sort((a, b) => {

                            const dateA = new Date(a.createdAt)
                            const dateB = new Date(b.createdAt)

                            return dateB - dateA

                          })

                          .map((user, i) => (

                            <tr
                              key={i}
                              className="
                              border-b
                              hover:bg-gray-900
                              bg-gray-950
                              border-gray-700
                              "
                            >

                              <th
                                scope="row"
                                className="
                                px-6
                                py-4
                                font-medium
                                whitespace-nowrap
                                text-white
                                "
                              >

                                {user._id}

                              </th>

                              <td className="px-6 py-4">

                                {user.name}

                              </td>

                              <td className="px-6 py-4">

                                {user.email}

                              </td>

                              <td className="px-6 py-4">

                                <span className='
                                bg-yellow-500/20
                                text-yellow-400
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                '>

                                  Pending

                                </span>

                              </td>

                              <td className="px-6 py-4">

                                {
                                  convertDateFormat(
                                    user.createdAt.substr(0, 10)
                                  )
                                }

                              </td>
                                <td className="
px-6
py-4
flex
gap-3
">

  <button

    onClick={() =>
      approveRecruiterHandler(user._id)
    }

    className='
    bg-green-600
    hover:bg-green-700
    px-4
    py-2
    rounded-lg
    text-sm
    font-semibold
    '

  >

    {actionLoading === user._id ?
     "Processing..." : "Approve"}

  </button>

  <button

    onClick={() =>
      rejectRecruiterHandler(user._id)
    }

    className='
    bg-red-600
    hover:bg-red-700
    px-4
    py-2
    rounded-lg
    text-sm
    font-semibold
    '

  >

    {actionLoading === user._id ?
     "Processing..." : "Reject"}
  </button>

</td>
                            </tr>

                          ))

                      }

                    </tbody>

                  </table>

                </div>
              }

            </div>
        }

      </div>

    </>

  )

}