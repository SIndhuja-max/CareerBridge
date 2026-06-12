import React from 'react'
import { MetaData } from '../components/MetaData'

export const About = () => {
  return (
    <>
      <MetaData title="About CareerBridge" />

      <div className="bg-gray-900 min-h-screen pt-14 md:px-20 px-3 text-white">
        <div className="grid md:grid-cols-3 gap-5 md:px-0 px-2 md:pt-8 pt-4 pb-20">

          <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
            <p className="text-4xl pb-3 font-bold text-center text-yellow-500">
              About Us
            </p>

            <p className="text-lg">
              At CareerBridge, we are more than just a job portal — we are a
              complete career growth platform designed to connect talented
              students, professionals, and recruiters with meaningful
              opportunities.
              <br /><br />
              Our mission is to simplify the hiring process by creating a smart,
              efficient, and reliable ecosystem where candidates can discover
              the right roles and recruiters can find the right talent faster.
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
            <p className="text-3xl text-yellow-500 text-center">
              What Sets Us Apart
            </p>

            <ul className="list-disc px-5 text-lg">
              <li>
                <span className="font-semibold text-lg">
                  Smart Job Matching:
                </span>{" "}
                Our platform helps candidates discover opportunities that align
                with their skills, experience, and career goals, reducing
                unnecessary effort and improving hiring efficiency.
              </li>

              <li>
                <span className="font-semibold text-lg">
                  Recruiter-Centric Workflow:
                </span>{" "}
                From job posting to application tracking and candidate
                management, CareerBridge offers a streamlined dashboard for
                recruiters to manage the full hiring process effectively.
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
            <p className="text-2xl text-yellow-500">
              Join the CareerBridge Community
            </p>

            <p className="pt-3">
              When you join CareerBridge, you become part of a growing network
              of ambitious professionals, students, recruiters, and mentors
              working together to shape stronger careers and better hiring
              outcomes.
            </p>

            <p className="pt-4">
              Thank you for choosing CareerBridge as your trusted career partner.
              Together, we build opportunities, growth, and long-term success.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}