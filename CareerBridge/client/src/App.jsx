import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Jobs } from './pages/Jobs'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { MyProfile } from './pages/MyProfile'
import { AppliedJobs } from './pages/AppliedJobs'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { JobDetails } from './pages/JobDetails'
import { ChangePassword } from './pages/ChangePassword'
import { EditProfile } from './pages/EditProfile'
import { DeleteAccount } from './pages/DeleteAccount'
import { Dashboard } from './pages/Dashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { CreateJob } from './pages/CreateJob'
import { JobsLayout } from './pages/JobsLayout'
import { Application } from './pages/Application'
import { ApplicationDetails } from './pages/ApplicationDetails'
import { ViewAllJobAdmin } from './pages/VIewAllJobAdmin'
import { ViewAllAppli } from './pages/ViewAllAppli'
import { ViewAllUsersAdmin } from './pages/ViewAllUsersAdmin'
import { ViewPendingRecruiters } from './pages/ViewPendingRecruiters'
import { EditAppAdmin } from './pages/EditAppAdmin'
import { EditUserAdmin } from './pages/EditUserAdmin'
import { EditJobAdmin } from './pages/EditJobAdmin'
import { Test } from './pages/Test'
import NotFound from './pages/NotFound'
import UnAuthorized from './pages/UnAuthorized'

import ScrollToTopWhenRouteChanges from './components/ScrollToTopOnRouteChange.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { logOrNot, me } from './actions/UserActions'
import { getAllJobs } from './actions/JobActions'

function App() {

  const dispatch = useDispatch()

  const {
    me: currentUser,
    authLoading
  } = useSelector(
    state => state.user
  )

  /*
  LOAD USER ONLY ONCE
  */

  useEffect(() => {

    const token = localStorage.getItem("userToken")

    if (token) {

      dispatch(logOrNot())
      dispatch(me())

    }

    dispatch(getAllJobs())

  }, [dispatch])

  /*
  PROTECTED ROUTE
  */

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children
  }) => {

    /*
    WAIT UNTIL USER LOADS
    */

    if (authLoading) {

      return null

    }

    /*
    UNAUTHORIZED
    */

    if (!authLoading && !isAllowed) {

      return <Navigate to={redirectPath} replace />

    }

    /*
    ALLOWED
    */

    return children
      ? children
      : <Outlet />

  }

  return (
    <>

      <ScrollToTopWhenRouteChanges />

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path='/' element={<Home />} />

        <Route path='/jobs' element={<Jobs />} />

        <Route path='/contact' element={<Contact />} />

        <Route path='/about' element={<About />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/details/:id' element={<JobDetails />} />

        {/* USER ROUTES */}

        <Route
          element={
            <ProtectedRoute
              isAllowed={
                ['applicant', 'recruiter', 'admin']
                  .includes(currentUser?.role)
              }
            />
          }
        >

          <Route
            path='/profile'
            element={<MyProfile />}
          />

          <Route
            path='/applied'
            element={<AppliedJobs />}
          />

         

          <Route
            path='/changePassword'
            element={<ChangePassword />}
          />

          <Route
            path='/editProfile'
            element={<EditProfile />}
          />

          <Route
            path='/deleteAccount'
            element={<DeleteAccount />}
          />

          <Route
            path='/JobsLayout'
            element={<JobsLayout />}
          />

          <Route
            path='/Application/:id'
            element={<Application />}
          />

          <Route
            path='/Application/Details/:id'
            element={<ApplicationDetails />}
          />

        </Route>

        {/* ADMIN / RECRUITER ROUTES */}

        <Route
          element={
            <ProtectedRoute
              isAllowed={
                ['recruiter', 'admin']
                  .includes(currentUser?.role)
              }
            />
          }
        >

          <Route
            path='/admin/dashboard'
            element={
              currentUser?.role === "admin"
                ? <AdminDashboard />
                : <Dashboard />
            }
          />

          <Route
            path='/admin/postJob'
            element={<CreateJob />}
          />

          <Route
            path='/admin/allJobs'
            element={<ViewAllJobAdmin />}
          />

          <Route
            path='/admin/allApplications'
            element={<ViewAllAppli />}
          />

          <Route
            path='/admin/allUsers'
            element={<ViewAllUsersAdmin />}
          />
          <Route
  path='/admin/recruiters'
  element={<ViewPendingRecruiters />}
/>

          <Route
            path='/admin/update/application/:id'
            element={<EditAppAdmin />}
          />

          <Route
            path='/admin/user/role/:id'
            element={<EditUserAdmin />}
          />

          <Route
            path='/admin/job/details/:id'
            element={<EditJobAdmin />}
          />

        </Route>

        {/* TEST */}

        <Route
          path='/test'
          element={<Test />}
        />

        {/* ERROR ROUTES */}

        <Route
          path='/unauthorized'
          element={<UnAuthorized />}
        />

        <Route
          path='*'
          element={<NotFound />}
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="mt-14 font-bold"
      />

      <Footer />

    </>
  )
}

export default App