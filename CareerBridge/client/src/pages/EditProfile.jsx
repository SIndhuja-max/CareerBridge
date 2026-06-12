import React, { useState, useEffect } from 'react'
import { Loader } from '../components/Loader'
import { MetaData } from '../components/MetaData'

import { AiOutlineMail } from 'react-icons/ai'
import { MdPermIdentity } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

import { updateProfile, me as ME } from '../actions/UserActions'

import { useDispatch, useSelector } from 'react-redux'

export const EditProfile = () => {

    const dispatch = useDispatch()

    const { loading, me } = useSelector(
        state => state.user
    )

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [avatar, setAvatar] = useState("")
    const [avatarName, setAvatarName] = useState("")

    const [resume, setResume] = useState(null)
    const [resumeName, setResumeName] = useState("")

    /*
    LOAD USER ONLY ONCE
    */

    useEffect(() => {

        if (!me?._id) {

            dispatch(ME())

        }

    }, [dispatch, me?._id])

    /*
    SET USER DATA
    */

    useEffect(() => {

        if (me?._id) {

            setName(me.name || "")
            setEmail(me.email || "")

        }

    }, [me])

    /*
    AVATAR CHANGE
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
    RESUME CHANGE
    */

    const resumeChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setResume(file)
        setResumeName(file.name)

    }

    /*
    UPDATE PROFILE
    */

    const editHandler = (e) => {

        e.preventDefault()

        const data = {

            newName: name,
            newEmail: email

        }

        if (avatar) {

            data.newAvatar = avatar

        }

        if (
            me?.role === "applicant"
            &&
            resume
        ) {

            data.newResume = resume

        }

        dispatch(updateProfile(data))

    }

    return (
        <>

            <MetaData title="Edit Profile" />

            <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>

                {
                    !me?._id ? (

                        <Loader />

                    ) : (

                        <div>

                            <div className='flex justify-center w-full items-start pt-14'>

                                <form
                                    onSubmit={editHandler}
                                    className='flex flex-col md:w-1/3 w-full md:mx-0 mx-3 pb-28'
                                >

                                    <div className='md:px-10 px-7 pb-6 w-full shadow-sm shadow-gray-700 border border-gray-700 pt-5 flex flex-col gap-4'>

                                        <div className='text-center'>

                                            <p className='text-4xl font-semibold'>
                                                Edit Profile
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

                                        {/* AVATAR */}

                                        <div>

                                            <div className='bg-white flex justify-center items-center'>

                                                <div className='text-gray-600 px-2'>
                                                    <CgProfile size={20} />
                                                </div>

                                                <label
                                                    htmlFor='avatar'
                                                    className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2'
                                                >

                                                    {
                                                        avatarName.length === 0
                                                            ? (
                                                                <span className='text-gray-500 font-medium'>
                                                                    Select New Profile Picture
                                                                </span>
                                                            )
                                                            : avatarName
                                                    }

                                                </label>

                                                <input
                                                    id='avatar'
                                                    name='avatar'
                                                    onChange={avatarChange}
                                                    accept="image/*"
                                                    type="file"
                                                    className='hidden'
                                                />

                                            </div>

                                        </div>

                                        {/* RESUME */}

                                        {
                                            me?.role === "applicant" && (

                                                <div>

                                                    <div className='bg-white flex justify-center items-center'>

                                                        <div className='text-gray-600 px-2'>
                                                            <BsFileEarmarkText size={20} />
                                                        </div>

                                                        <label
                                                            htmlFor='resume'
                                                            className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2'
                                                        >

                                                            {
                                                                resumeName.length === 0
                                                                    ? (
                                                                        <span className='text-gray-500 font-medium'>
                                                                            Select New Resume
                                                                        </span>
                                                                    )
                                                                    : resumeName
                                                            }

                                                        </label>

                                                        <input
                                                            id='resume'
                                                            name='resume'
                                                            onChange={resumeChange}
                                                            accept=".pdf,.doc,.docx"
                                                            type="file"
                                                            className='hidden'
                                                        />

                                                    </div>

                                                </div>

                                            )
                                        }

                                        {/* BUTTON */}

                                        <div>

                                            <button
                                                disabled={loading}
                                                className='blueCol px-8 w-full py-2 flex justify-center items-center font-semibold'
                                            >

                                                {
                                                    loading
                                                        ? "Updating..."
                                                        : "Update Profile"
                                                }

                                            </button>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    )
                }

            </div>

        </>
    )

}