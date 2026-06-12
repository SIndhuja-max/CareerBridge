import React, { useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'
import { getAllAppAdmin, deleteApp } from '../actions/AdminActions'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'

export const ViewAllAppli = () => {
  const dispatch = useDispatch()

  const { loading, allApplications } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAllAppAdmin())
  }, [dispatch])

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

  const deleteApplication = (id) => {
    dispatch(deleteApp(id))
  }

  return (
    <>
      <MetaData title="All Applications" />

      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div>
              <p className='text-center pt-3 pb-4 text-3xl font-medium'>
                All Applications
              </p>
            </div>

            <div className="relative pb-24 overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-200 uppercase blueCol">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Application Id
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Job Name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Applicant
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Created On
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allApplications &&
                    allApplications
                      .filter((app) => app?._id)
                      .sort((a, b) => {
                        const dateA = new Date(a.createdAt)
                        const dateB = new Date(b.createdAt)
                        return dateB - dateA
                      })
                      .map((app) => (
                        <tr
                          key={app._id}
                          className="border-b bg-gray-950 border-gray-700 text-white hover:bg-gray-900"
                        >
                          <td className="px-6 py-4 font-medium whitespace-nowrap">
                            {app._id}
                          </td>

                          <td className="px-6 py-4">
                            {app?.job?.title || "Job Deleted"}
                          </td>

                          <td className="px-6 py-4">
                            {app?.applicant?.name || "Applicant Deleted"}
                          </td>

                          <td
                            className={`px-6 py-4 ${
                              app.status === "pending"
                                ? "text-blue-500"
                                : app.status === "rejected"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {app.status}
                          </td>

                          <td className="px-6 py-4">
                            {app?.createdAt
                              ? convertDateFormat(app.createdAt.substr(0, 10))
                              : "N/A"}
                          </td>

                          <td className="px-6 py-4 flex gap-4">
                            <Link
                              to={`/admin/update/application/${app._id}`}
                              className='text-blue-500 hover:text-blue-400 cursor-pointer'
                            >
                              <MdOutlineModeEditOutline size={20} />
                            </Link>

                            <button
                              onClick={() => deleteApplication(app._id)}
                              className='text-red-500 hover:text-red-400 cursor-pointer'
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {allApplications && allApplications.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-lg">
                  No applications found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}