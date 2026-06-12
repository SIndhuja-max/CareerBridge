// Dashboard.jsx

import { motion } from 'framer-motion'
import React, { useEffect } from "react";
import { MetaData } from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllJobsAdmin,
  getAllUsersAdmin,
  getAllAppAdmin,
  getAnalyticsData
} from "../actions/AdminActions";

import CountUp from "react-countup";
import { Loader } from "../components/Loader";


import {
  MdOutlineWork,
  MdOutlinePeople,
  MdOutlineAssignmentTurnedIn,
  MdOutlineAddBusiness
} from "react-icons/md";

import {
  BsBriefcaseFill,
  BsGraphUpArrow
} from "react-icons/bs";

import { Link } from "react-router-dom";

export const Dashboard = () => {

  const dispatch = useDispatch();

  const {
    loading,
    allJobs,
    allApplications,
    allUsers,
    analytics
} = useSelector((state) => state.admin);

const {
    me
} = useSelector((state) => state.user);

  useEffect(() => {

    dispatch(getAllJobsAdmin());

    dispatch(getAllUsersAdmin());

    dispatch(getAllAppAdmin());

    dispatch(getAnalyticsData());

  }, [dispatch]);
 if (
    me?.role === "recruiter"
    &&
    me?.recruiterStatus === "pending"
) {

    return (

        <div className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
        items-center
        justify-center
        px-6
        ">

            <div className="
            bg-[#111827]
            border
            border-yellow-500/20
            rounded-3xl
            p-10
            text-center
            max-w-2xl
            shadow-xl
            ">

                <h1 className="
                text-4xl
                font-bold
                text-yellow-400
                ">
                    Recruiter Verification Pending
                </h1>

                <p className="
                text-gray-300
                pt-6
                text-lg
                leading-8
                ">

                    Your recruiter account is currently under
                    admin verification.

                    <br /><br />

                    You will be able to post jobs,
                    manage applications, and access
                    recruiter features after approval.

                </p>

            </div>

        </div>

    )

}

if (
    me?.role === "recruiter"
    &&
    me?.recruiterStatus === "rejected"
) {

    return (

        <div className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
        items-center
        justify-center
        px-6
        ">

            <div className="
            bg-[#111827]
            border
            border-red-500/20
            rounded-3xl
            p-10
            text-center
            max-w-2xl
            shadow-xl
            ">

                <h1 className="
                text-4xl
                font-bold
                text-red-500
                ">
                    Recruiter Verification Rejected
                </h1>

                <p className="
                text-gray-300
                pt-6
                text-lg
                leading-8
                ">

                    Your recruiter verification request
                    was rejected by the admin team.

                    <br /><br />

                    Please register again using valid
                    startup/company details.

                </p>

            </div>

        </div>

    )

}

  const stats = [

    {
      title: "Total Users",
      value: allUsers ? allUsers.length : 0,
      icon: <MdOutlinePeople size={28} />
    },

    {
      title: "Active Jobs",
      value: allJobs ? allJobs.length : 0,
      icon: <MdOutlineWork size={28} />
    },

    {
      title: "Applications",
      value: allApplications ? allApplications.length : 0,
      icon: <MdOutlineAssignmentTurnedIn size={28} />
    },

    {
      title: "Hiring Success",
      value: analytics
        ? `${analytics.hiringSuccessRate}%`
        : "0%",
      icon: <BsGraphUpArrow size={24} />
    }

  ];

  return (
    <>

      <MetaData title="Recruiter Dashboard" />

      <div className="bg-[#020617] min-h-screen text-white px-4 md:px-12 pt-24 pb-20">

        {loading ? (

          <Loader />

        ) : (

          <>

            {/* HERO SECTION */}

            <div className="bg-[#0F172A] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-xl">

              <div className="flex md:flex-row flex-col justify-between gap-8">

                <div>

                  <p className="text-4xl font-bold">
                    Welcome back, Recruiter 👋
                  </p>

                  <p className="text-gray-400 pt-3 text-lg max-w-2xl">
                    Manage hiring smarter, faster, and better with your
                    CareerBridge recruiter command center.
                  </p>

                  <div className="pt-8">

                    <Link
                      to="/admin/postJob"
                      className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
                    >

                      <MdOutlineAddBusiness size={22} />

                      Post New Job

                    </Link>

                  </div>

                </div>

                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 min-w-[280px]">

                  <p className="text-lg font-semibold">
                    Today’s Hiring Summary
                  </p>

                  <div className="pt-5 flex flex-col gap-4 text-gray-300">

                    <p>
                      • {analytics?.totalApplications || 0} Total Applications
                    </p>

                    <p>
                      • {analytics?.totalJobs || 0} Active Recruitments Running
                    </p>

                    <p>
                      • {analytics?.pendingApplications || 0} Pending Candidate Reviews
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="pt-12">

              <p className="text-2xl font-semibold pb-6">
                Quick Actions
              </p>

              <div className="grid md:grid-cols-4 grid-cols-1 gap-6">

                <Link
                  to="/admin/postJob"
                  className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 shadow-lg"
                >

                  <BsBriefcaseFill size={28} />

                  <p className="pt-4 text-lg font-semibold">
                    Create Job Post
                  </p>

                </Link>

                <Link
                  to="/admin/allApplications"
                  className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 shadow-lg"
                >

                  <MdOutlineAssignmentTurnedIn size={28} />

                  <p className="pt-4 text-lg font-semibold">
                    Review Applications
                  </p>

                </Link>

                <Link
                  to="/admin/allJobs"
                  className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 shadow-lg"
                >

                  <MdOutlineWork size={28} />

                  <p className="pt-4 text-lg font-semibold">
                    Manage Jobs
                  </p>

                </Link>

                <Link
                  to="/admin/allUsers"
                  className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 shadow-lg"
                >

                  <MdOutlinePeople size={28} />

                  <p className="pt-4 text-lg font-semibold">
                    Candidate Search
                  </p>

                </Link>

              </div>

            </div>

            {/* STATS */}

            <div className="pt-14">

              <p className="text-2xl font-semibold pb-6">
                Platform Overview
              </p>

              <div className="grid md:grid-cols-4 grid-cols-1 gap-6">

                {stats.map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                      scale: 1.02
                    }}
                    transition={{
                      duration: 0.25
                    }}
                    className="
                    bg-[#0F172A]
                    border
                    border-gray-800
                    rounded-2xl
                    p-7
                    shadow-lg
                    relative
                    overflow-hidden
                    "
                  >

                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />

                    <div className="relative z-10">

                      <div className="text-blue-400">
                        {item.icon}
                      </div>

                      <p className="text-gray-400 pt-5">
                        {item.title}
                      </p>

                      <p className="text-4xl font-bold pt-3">

                        {typeof item.value === "number" ? (

                          <CountUp
                            start={0}
                            end={item.value}
                            duration={2}
                          />

                        ) : (

                          item.value

                        )}

                      </p>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>
            

            {/* ANALYTICS */}
            <div className="pt-8 pb-10">

  <p className="text-3xl font-semibold">
    Hiring Analytics
  </p>

  <p className="text-gray-400 pt-2">
    Real-time recruitment insights and platform activity
  </p>

</div>

            <div className="pt-4">

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* APPLICATION STATUS */}

                <motion.div
                  whileHover={{
                    y: -4
                  }}
                  className="
                  bg-[#111827]
                  border
                  border-gray-800
                  rounded-3xl
                  p-6
                  shadow-xl
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-2xl font-semibold">
                        Application Status
                      </p>

                      <p className="text-gray-400 pt-2">
                        Recruitment pipeline overview
                      </p>

                    </div>

                    <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-violet-500/20
                    flex
                    items-center
                    justify-center
                    text-2xl
                    ">
                      📊
                    </div>

                  </div>

                  <div className="pt-10 flex flex-col gap-6">

                    {/* ACCEPTED */}

                    <div>

                      <div className="flex justify-between pb-2">

                        <span className="text-green-400">
                          Accepted
                        </span>

                        <span>
                          {analytics?.acceptedPercentage || 0}%
                        </span>

                      </div>

                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${analytics?.acceptedPercentage || 0}%`
                          }}
                          transition={{ duration: 1 }}
                          className="h-full bg-green-500 rounded-full"
                        />

                      </div>

                    </div>

                    {/* PENDING */}

                    <div>

                      <div className="flex justify-between pb-2">

                        <span className="text-yellow-400">
                          Pending
                        </span>

                        <span>
                          {analytics?.pendingPercentage || 0}%
                        </span>

                      </div>

                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${analytics?.pendingPercentage || 0}%`
                          }}
                          transition={{ duration: 1 }}
                          className="h-full bg-yellow-500 rounded-full"
                        />

                      </div>

                    </div>

                    {/* REJECTED */}

                    <div>

                      <div className="flex justify-between pb-2">

                        <span className="text-red-400">
                          Rejected
                        </span>

                        <span>
                          {analytics?.rejectedPercentage || 0}%
                        </span>

                      </div>

                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${analytics?.rejectedPercentage || 0}%`
                          }}
                          transition={{ duration: 1 }}
                          className="h-full bg-red-500 rounded-full"
                        />

                      </div>

                    </div>

                  </div>

                </motion.div>

                {/* RECENT ACTIVITY */}

                <motion.div
                  whileHover={{
                    y: -4
                  }}
                  className="
                  bg-[#111827]
                  border
                  border-gray-800
                  rounded-3xl
                  p-6
                  shadow-xl
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-2xl font-semibold">
                        Recent Activity
                      </p>

                      <p className="text-gray-400 pt-2">
                        Latest hiring platform events
                      </p>

                    </div>

                    <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-500/20
                    flex
                    items-center
                    justify-center
                    text-2xl
                    ">
                      ⚡
                    </div>

                  </div>

                  <div className="pt-8 flex flex-col gap-5">

                    <div className="flex gap-4 items-start">

                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2" />

                      <div>

                        <p className="font-medium">
                          {analytics?.acceptedApplications || 0} applications accepted
                        </p>

                        <p className="text-sm text-gray-400">
                          Successful hiring progress improving
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-4 items-start">

                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2" />

                      <div>

                        <p className="font-medium">
                          {analytics?.totalJobs || 0} active jobs running
                        </p>

                        <p className="text-sm text-gray-400">
                          Recruiters actively hiring candidates
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-4 items-start">

                      <div className="w-3 h-3 bg-violet-500 rounded-full mt-2" />

                      <div>

                        <p className="font-medium">
                          {analytics?.pendingApplications || 0} pending reviews
                        </p>

                        <p className="text-sm text-gray-400">
                          Recruiters reviewing applications
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-4 items-start">

                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2" />

                      <div>

                        <p className="font-medium">
                          {analytics?.totalUsers || 0} users on platform
                        </p>

                        <p className="text-sm text-gray-400">
                          CareerBridge community expanding
                        </p>

                      </div>

                    </div>

                  </div>

                </motion.div>

                {/* TOP HIRING DOMAIN */}

                <motion.div
                  whileHover={{
                    y: -4
                  }}
                  className="
                  bg-[#111827]
                  border
                  border-gray-800
                  rounded-3xl
                  p-6
                  shadow-xl
                  flex
                  flex-col
                  justify-between
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-2xl font-semibold">
                        Top Hiring Domain
                      </p>

                      <p className="text-gray-400 pt-2">
                        Most active recruitment category
                      </p>

                    </div>

                    <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-pink-500/20
                    flex
                    items-center
                    justify-center
                    text-2xl
                    ">
                      🚀
                    </div>

                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 pt-10">

                    <div className="
                    relative
                    w-40
                    h-40
                    rounded-full
                    border-[12px]
                    border-violet-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_40px_rgba(139,92,246,0.3)]
                    ">

                      <div className="text-center">

                        <p className="text-2xl font-bold capitalize">
                          {analytics?.topCategory || "N/A"}
                        </p>

                      </div>

                    </div>

                    <div className="pt-8 text-center">

                      <p className="text-gray-400 pt-2">
                        Highest hiring activity this month
                      </p>

                    </div>

                  </div>

                </motion.div>

              </div>

            </div>

          </>

        )}

      </div>
      

    </>
  );
};