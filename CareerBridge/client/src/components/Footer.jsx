import React from 'react'
import { MdOutlineBusinessCenter } from 'react-icons/md'

import {
  FaFacebook,
  FaTwitterSquare,
  FaYoutube
} from 'react-icons/fa'

import {
  AiFillInstagram,
  AiFillMail
} from 'react-icons/ai'

export const Footer = () => {

  return (

    <>

      <div className="bg-gray-900 text-white py-8 md:px-16 px-6">

        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 items-center">

          {/* LEFT SECTION */}

<div className="flex flex-col gap-4 text-center md:text-left">

  <p className="text-2xl font-semibold">
    Why CareerBridge?
  </p>

  <div className="flex flex-col gap-3 text-gray-300 text-sm">

    <div className="flex items-center gap-2 justify-center md:justify-start">
      <span className="text-green-400">✔</span>
      Smart Job Applications
    </div>

    <div className="flex items-center gap-2 justify-center md:justify-start">
      <span className="text-green-400">✔</span>
      Resume-Based Hiring
    </div>

    <div className="flex items-center gap-2 justify-center md:justify-start">
      <span className="text-green-400">✔</span>
      Recruiter Dashboard
    </div>

    <div className="flex items-center gap-2 justify-center md:justify-start">
      <span className="text-green-400">✔</span>
      Real-Time Status Updates
    </div>

  </div>

</div>

          {/* CENTER SECTION */}

          <div className="flex flex-col justify-center items-center gap-3">

            <p className="titleT text-3xl flex justify-center items-start">

              <MdOutlineBusinessCenter />

              CAREERBRIDGE

            </p>

            <p className="text-gray-300 text-sm md:text-base text-center">

              Connecting talent with opportunity.

            </p>

            <div className="flex gap-5 pt-2">

              <FaFacebook
                className="cursor-pointer hover:text-[#2D68C4] duration-200 ease"
                size={22}
              />

              <FaTwitterSquare
                className="cursor-pointer hover:text-[#1DA1F2] duration-200 ease"
                size={22}
              />

              <FaYoutube
                className="cursor-pointer hover:text-[#FF0000] duration-200 ease"
                size={22}
              />

              <AiFillInstagram
                className="cursor-pointer hover:text-[#C13584] duration-200 ease"
                size={22}
              />

              <AiFillMail
                className="cursor-pointer hover:text-[#D44638] duration-200 ease"
                size={22}
              />

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="flex flex-col gap-3 text-center md:text-right">

            <p className="text-sm">

              Designed and Developed by{" "}

              <span className="underline text-blue-400">
                Sindhu
              </span>

            </p>

            <p className="text-sm text-gray-300">

              &copy; 2026 CareerBridge.
              All rights reserved.

            </p>

            <p className="text-xs text-gray-500">

              Built with React, Node.js,
              MongoDB and Tailwind CSS.

            </p>

          </div>

        </div>

      </div>

    </>

  )

}