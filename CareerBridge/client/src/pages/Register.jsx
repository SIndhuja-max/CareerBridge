import React, { useState, useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import {
  AiOutlineMail,
  AiOutlineUnlock,
  AiOutlineEyeInvisible,
  AiOutlineEye
} from 'react-icons/ai'

import { MdPermIdentity } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

import { Link, useNavigate } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'

import { registerUser } from '../actions/UserActions'

import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {

  const { loading, isLogin } = useSelector(
    state => state.user
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [eyeTog, setEyeTog] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [role, setRole] = useState("Applicant")

  const [avatar, setAvatar] = useState("")
  const [avatarName, setAvatarName] = useState("")

  const [resume, setResume] = useState(null)
  const [resumeName, setResumeName] = useState("")

  const [receiveNotifications, setReceiveNotifications] =
    useState(true)

  /*
  PROFILE IMAGE
  */

  const avatarChange = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {

      if (reader.readyState === 2) {

        setAvatar(reader.result)
        setAvatarName(file.name)

      }

    }

    reader.readAsDataURL(file)

  }

  /*
  RESUME
  */

  const resumeChange = (e) => {

    const file = e.target.files[0]

    if (!file) return

    /*
    VALIDATION
    */

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    if (!allowedTypes.includes(file.type)) {

      alert("Only PDF, DOC and DOCX allowed")

      e.target.value = ""

      return

    }

    setResume(file)
    setResumeName(file.name)

  }

  /*
  REGISTER
  */

  const registerHandler = (e) => {

    e.preventDefault()

    if (!avatar) {

      alert("Profile picture is required")
      return

    }

    if (
      role === "Applicant"
      &&
      !resume
    ) {

      alert("Resume is required for applicants")
      return

    }

    const data = new FormData()

    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    data.append("avatar", avatar)
    data.append("role", role)

    if (role === "Applicant") {

      data.append("resume", resume)

      data.append(
        "receiveNotifications",
        receiveNotifications
      )

    }

    if (passwordError) {

  return

}

dispatch(registerUser(data))

  }

  /*
  REDIRECT
  */

  useEffect(() => {

    if (isLogin) {

      setName("")
      setEmail("")
      setPassword("")
      setAvatar("")
      setAvatarName("")
      setResume(null)
      setResumeName("")
      setRole("Applicant")
      setReceiveNotifications(true)

      navigate("/")

    }

  }, [isLogin, navigate])

  return (
    <>

      <MetaData title="Register" />

      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>

        <div className='flex justify-center w-full items-start pt-6'>

          <form
            onSubmit={registerHandler}
            className='flex flex-col md:w-1/2 w-full md:mx-0 mx-4'
          >

            <div className='md:px-10 px-2 pt-4 pb-20 w-full flex flex-col gap-4'>

              <div className='text-center'>

                <p className='text-4xl font-medium'>
                  Register
                </p>

              </div>

              {/* NAME */}

              <div className='bg-white flex justify-center items-center'>

                <div className='text-gray-600 px-2'>
                  <MdPermIdentity size={20} />
                </div>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  placeholder='Full Name'
                  type="text"
                  className='outline-none w-full text-black px-1 pr-3 py-2'
                />

              </div>

              {/* EMAIL */}

              <div className='bg-white flex justify-center items-center'>

                <div className='text-gray-600 px-2'>
                  <AiOutlineMail size={20} />
                </div>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  placeholder='Email'
                  type="email"
                  className='outline-none w-full text-black px-1 pr-3 py-2'
                />

              </div>

              {/* PASSWORD */}

              <div className='bg-white flex justify-center items-center'>

                <div className='text-gray-600 px-2'>
                  <AiOutlineUnlock size={20} />
                </div>

                <input
                  value={password}
                 onChange={(e) => {

  const value = e.target.value

  setPassword(value)

  /*
  PASSWORD VALIDATION
  */

  if (value.length < 8) {

    setPasswordError(
      "Password must contain at least 8 characters"
    )

  }

  else if (value[0] !== value[0]?.toUpperCase()) {

    setPasswordError(
      "First letter must be capital"
    )

  }

  else if (!/[0-9]/.test(value)) {

    setPasswordError(
      "Password must contain at least one number"
    )

  }

  else if (
    !/[!@#$%^&*(),.?\":{}|<>]/.test(value)
  ) {

    setPasswordError(
      "Password must contain at least one special character"
    )

  }

  else {

    setPasswordError("")

  }

}}
                  required
                  placeholder='Password'
                  type={eyeTog ? "text" : "password"}
                  className='outline-none w-full text-black px-1 pr-3 py-2'
                />

                <div className='text-gray-600 px-2 cursor-pointer'>

                  {
                    eyeTog ? (

                      <AiOutlineEye
                        size={20}
                        onClick={() =>
                          setEyeTog(false)
                        }
                      />

                    ) : (

                      <AiOutlineEyeInvisible
                        size={20}
                        onClick={() =>
                          setEyeTog(true)
                        }
                      />

                    )
                  }

                </div>

              </div>
              {
  passwordError && (

    <p className='text-red-400 text-sm pl-1'>
      {passwordError}
    </p>

  )
}

              {/* ROLE */}

              <div className='bg-white flex justify-center items-center'>

                <div className='text-gray-600 px-2'>
                  <MdPermIdentity size={20} />
                </div>

                <select
                  value={role}
                  onChange={(e) => {

                    const selectedRole =
                      e.target.value

                    setRole(selectedRole)

                    if (
                      selectedRole === "Recruiter"
                    ) {

                      setResume(null)
                      setResumeName("")
                      setReceiveNotifications(true)

                    }

                  }}
                  className='outline-none w-full text-black px-1 pr-3 py-2'
                >

                  <option value="Applicant">
                    Applicant
                  </option>

                  <option value="Recruiter">
                    Recruiter
                  </option>

                </select>

              </div>

              {/* AVATAR */}

              <div>

                <div className='bg-white flex justify-center items-center'>

                  <div className='text-gray-600 px-2'>

                    {
                      avatar.length === 0 ? (

                        <CgProfile size={20} />

                      ) : (

                        <img
                          src={avatar}
                          className='w-[3em] h-[2.5em]'
                          alt=""
                        />

                      )
                    }

                  </div>

                  <label
                    htmlFor='avatar'
                    className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2'
                  >

                    {
                      avatarName.length === 0 ? (

                        <span className='text-gray-500 font-medium'>
                          Select Profile Picture
                        </span>

                      ) : (

                        avatarName

                      )
                    }

                  </label>

                  <input
                    id='avatar'
                    type="file"
                    accept="image/*"
                    onChange={avatarChange}
                    className='hidden'
                  />

                </div>

              </div>

              {/* APPLICANT */}

              {
                role === "Applicant" && (

                  <>

                    <div>

                      <div className='bg-white flex justify-center items-center'>

                        <div className='text-gray-600 px-2'>
                          <BsFileEarmarkText size={20} />
                        </div>

                        <label
                          htmlFor="resume"
                          className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2'
                        >

                          {
                            resumeName.length === 0 ? (

                              <span className='text-gray-500 font-medium'>
                                Upload Resume
                              </span>

                            ) : (

                              resumeName

                            )
                          }

                        </label>

                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={resumeChange}
                          className="hidden"
                        />

                      </div>

                    </div>

                    <div className='flex justify-between items-center bg-gray-900 border border-gray-700 px-4 py-3 rounded'>

                      <p className='text-sm md:text-base'>
                        Receive email updates
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setReceiveNotifications(
                            !receiveNotifications
                          )
                        }
                        className={`px-4 py-1 rounded font-semibold ${
                          receiveNotifications
                            ? "bg-green-600"
                            : "bg-gray-700"
                        }`}
                      >

                        {
                          receiveNotifications
                            ? "ON"
                            : "OFF"
                        }

                      </button>

                    </div>

                  </>

                )
              }

              {/* BUTTON */}

              <button
                disabled={loading}
                className='blueCol flex justify-center items-center px-8 w-full py-2 font-semibold'
              >

                {
                  loading ? (

                    <TbLoader2
                      className='animate-spin'
                      size={24}
                    />

                  ) : (

                    "Register"

                  )
                }

              </button>

              {/* LOGIN */}

              <div className='text-center text-sm pt-2'>

                <p>

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className='text-yellow-400 underline'
                  >
                    Login
                  </Link>

                </p>

              </div>

            </div>

          </form>

        </div>

      </div>

    </>
  )
} 