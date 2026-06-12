import React from 'react'
import {
  Users,
  Briefcase,
  FileText,
  ShieldCheck,
  Activity,
  UserCheck,
  BarChart3,
  FolderKanban
} from 'lucide-react'

export const AdminDashboard = () => {

  return (

    <div className="
    min-h-screen
    bg-[#020617]
    text-white
    px-6
    md:px-10
    pt-28
    pb-8
    ">

      {/* HEADER */}

      <div className="pb-8">

        <h1 className="
        text-4xl
        font-bold
        ">
          Admin Dashboard
        </h1>

        <p className="
        text-gray-400
        pt-2
        text-base
        ">
          Internal platform management and monitoring
        </p>

      </div>

      {/* TOP ANALYTICS */}

      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-5
      ">

        {/* USERS */}

        <div className="
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-5
        ">

          <div className="
          flex
          items-center
          justify-between
          ">

            <div>

              <p className="
              text-gray-400
              text-sm
              ">
                Total Users
              </p>

              <h1 className="
              text-4xl
              font-bold
              pt-3
              ">
                21
              </h1>

            </div>

            <div className="
            w-14
            h-14
            rounded-xl
            bg-blue-500/20
            flex
            items-center
            justify-center
            ">

              <Users
                size={28}
                className="text-blue-400"
              />

            </div>

          </div>

        </div>

        {/* JOBS */}

        <div className="
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-5
        ">

          <div className="
          flex
          items-center
          justify-between
          ">

            <div>

              <p className="
              text-gray-400
              text-sm
              ">
                Active Jobs
              </p>

              <h1 className="
              text-4xl
              font-bold
              pt-3
              ">
                4
              </h1>

            </div>

            <div className="
            w-14
            h-14
            rounded-xl
            bg-yellow-500/20
            flex
            items-center
            justify-center
            ">

              <Briefcase
                size={28}
                className="text-yellow-400"
              />

            </div>

          </div>

        </div>

        {/* APPLICATIONS */}

        <div className="
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-5
        ">

          <div className="
          flex
          items-center
          justify-between
          ">

            <div>

              <p className="
              text-gray-400
              text-sm
              ">
                Applications
              </p>

              <h1 className="
              text-4xl
              font-bold
              pt-3
              ">
                5
              </h1>

            </div>

            <div className="
            w-14
            h-14
            rounded-xl
            bg-green-500/20
            flex
            items-center
            justify-center
            ">

              <FileText
                size={28}
                className="text-green-400"
              />

            </div>

          </div>

        </div>

        {/* SECURITY */}

        <div className="
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-5
        ">

          <div className="
          flex
          items-center
          justify-between
          ">

            <div>

              <p className="
              text-gray-400
              text-sm
              ">
                System Status
              </p>

              <h1 className="
              text-2xl
              font-bold
              pt-4
              text-green-400
              ">
                Secure
              </h1>

            </div>

            <div className="
            w-14
            h-14
            rounded-xl
            bg-purple-500/20
            flex
            items-center
            justify-center
            ">

              <ShieldCheck
                size={28}
                className="text-purple-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* SECOND SECTION */}

      <div className="
      grid
      grid-cols-1
      xl:grid-cols-3
      gap-5
      mt-8
      ">

        {/* RECENT ACTIVITY */}

        <div className="
        xl:col-span-2
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-6
        ">

          <div className="
          flex
          items-center
          justify-between
          pb-6
          ">

            <div>

              <h2 className="
              text-2xl
              font-bold
              ">
                Recent Activity
              </h2>

              <p className="
              text-gray-400
              pt-1
              ">
                Latest platform updates
              </p>

            </div>

            <Activity className="text-blue-400" />

          </div>

          <div className="space-y-5">

            <div className="flex items-start gap-4">

              <div className="
              w-3
              h-3
              rounded-full
              bg-green-400
              mt-2
              " />

              <div>

                <h3 className="font-semibold">
                  New application submitted
                </h3>

                <p className="text-gray-400 text-sm">
                  Frontend Developer role received a new candidate
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="
              w-3
              h-3
              rounded-full
              bg-yellow-400
              mt-2
              " />

              <div>

                <h3 className="font-semibold">
                  Recruiter posted a job
                </h3>

                <p className="text-gray-400 text-sm">
                  UI/UX Designer position published successfully
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="
              w-3
              h-3
              rounded-full
              bg-purple-400
              mt-2
              " />

              <div>

                <h3 className="font-semibold">
                  Candidate shortlisted
                </h3>

                <p className="text-gray-400 text-sm">
                  Backend Developer hiring moved to next stage
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="
        bg-[#111827]
        border
        border-gray-800
        rounded-2xl
        p-6
        ">

          <div className="pb-6">

            <h2 className="
            text-2xl
            font-bold
            ">
              Quick Actions
            </h2>

            <p className="
            text-gray-400
            pt-1
            ">
              Administrative controls
            </p>

          </div>

          <div className="space-y-4">

            {/* VERIFY RECRUITERS */}

            <button
              onClick={() => window.location.href='/admin/recruiters'}
              className="
              w-full
              bg-blue-500/10
              hover:bg-blue-500/20
              transition
              border
              border-blue-500/20
              rounded-xl
              p-4
              flex
              items-center
              gap-4
              "
            >

              <UserCheck className="text-blue-400" />

              <span className="font-medium">
                Verify Recruiters
              </span>

            </button>

            {/* APPLICATION REPORTS */}

            <button
              onClick={() => window.location.href='/admin/allApplications'}
              className="
              w-full
              bg-yellow-500/10
              hover:bg-yellow-500/20
              transition
              border
              border-yellow-500/20
              rounded-xl
              p-4
              flex
              items-center
              gap-4
              "
            >

              <BarChart3 className="text-yellow-400" />

              <span className="font-medium">
                Application Reports
              </span>

            </button>

            {/* MANAGE JOBS */}

            <button
              onClick={() => window.location.href='/admin/allJobs'}
              className="
              w-full
              bg-purple-500/10
              hover:bg-purple-500/20
              transition
              border
              border-purple-500/20
              rounded-xl
              p-4
              flex
              items-center
              gap-4
              "
            >

              <FolderKanban className="text-purple-400" />

              <span className="font-medium">
                Manage Jobs
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}