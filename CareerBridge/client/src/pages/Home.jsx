import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MetaData } from '../components/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { getAllJobs } from '../actions/JobActions'
import Testimonials from '../components/Testimonials/Testimonials.jsx'

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dispatch = useDispatch()

  const { loading, allJobs } = useSelector(
    state => state.job
  )

  const data = [
    { link: "/images/JobData/1.jpg" },
    { link: "/images/JobData/3.jpg" },
    { link: "/images/JobData/4.jpg" },
    { link: "/images/JobData/5.jpg" },
    { link: "/images/JobData/7.jpg" },
    { link: "/images/JobData/8.jpg" },
    { link: "/images/JobData/9.jpg" },
    { link: "/images/JobData/10.jpg" },
    { link: "/images/JobData/11.jpg" },
    { link: "/images/JobData/12.jpg" },
    { link: "/images/JobData/15.jpg" },
    { link: "/images/JobData/17.jpg" }
  ]

  useEffect(() => {

    dispatch(getAllJobs())

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

  return (
    <>
      <MetaData title="CareerBridge" />

      <div className='relative overflow-x-hidden min-h-screen md:px-20 px-3 pt-14 text-white bg-gray-950'>

        {/* BACKGROUND */}

        <div className='absolute inset-0 overflow-hidden'>

          <motion.div
            animate={{
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className='absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-violet-600/10 rounded-full blur-3xl'
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className='absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl'
          />

        </div>

        <div className='relative z-10 w-full flex flex-col items-center will-change-transform'>

          {/* HERO SECTION */}

          <div className='pt-28 flex flex-col items-center gap-6 text-center'>

            <motion.h1
              initial={{
                opacity: 0,
                y: 40
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              className='md:text-8xl text-6xl titleT tracking-wide'
            >
              CAREERBRIDGE
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2,
                duration: 0.6
              }}
              className='md:text-xl text-sm max-w-2xl text-gray-300 leading-8'
            >
              Connecting
              <span className='text-yellow-500'> talent </span>
              with opportunity through a smarter hiring ecosystem.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 15
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4,
                duration: 0.5
              }}
              whileHover={{
                scale: 1.03
              }}
              whileTap={{
                scale: 0.98
              }}
            >

              <Link
                to="/jobs"
                className='font-semibold md:text-xl text-base blueCol md:py-3 py-2 px-8 md:px-12 rounded-lg transition-all duration-300 hover:shadow-xl'
              >
                Browse Jobs
              </Link>

            </motion.div>

          </div>

          {/* FEATURED JOBS */}

<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
  viewport={{ once: true }}
  className='pt-24 w-full'
>

  <div className='flex justify-between items-center pb-8 relative'>

    <p className='titleT text-3xl'>
      Featured Jobs
    </p>

  </div>

  {loading ? (

    <div className='w-full flex justify-center items-center py-10'>
      <span className="loader1"></span>
    </div>

  ) : (

    <>
      {allJobs && allJobs.length > 0 ? (

        <div className='overflow-hidden w-full relative'>

          {/* LEFT ARROW */}

          <button
            onClick={() => {

              if (currentIndex > 0) {

                setCurrentIndex(currentIndex - 1)

              }

            }}
            className='
            absolute
            left-[-12px]
            top-1/2
            -translate-y-1/2
            z-20
            bg-black/40
            backdrop-blur-md
            border
            border-gray-700
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-violet-600
            hover:scale-110
            transition-all
            duration-300
            '
          >
            <FaChevronLeft />
          </button>

          {/* RIGHT ARROW */}

          <button
            onClick={() => {

              if (currentIndex < allJobs.length - 3) {

                setCurrentIndex(currentIndex + 1)

              }

            }}
            className='
            absolute
            right-[-12px]
            top-1/2
            -translate-y-1/2
            z-20
            bg-black/40
            backdrop-blur-md
            border
            border-gray-700
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-violet-600
            hover:scale-110
            transition-all
            duration-300
            '
          >
            <FaChevronRight />
          </button>

          <motion.div
            animate={{
              x: `-${currentIndex * 33.5}%`
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className='flex gap-5'
          >

            {allJobs.map((job, index) => (

              <motion.div
                key={job._id}
                whileHover={{
                  y: -6,
                  scale: 1.01
                }}
                transition={{
                  duration: 0.25
                }}
                className='min-w-[32%] flex-shrink-0'
              >

                <Link
                  to={`/details/${job._id}`}
                  className='
                  flex
                  flex-col
                  gap-5
                  shadow-lg
                  border
                  border-gray-800
                  bg-gray-900/50
                  backdrop-blur-md
                  rounded-3xl
                  p-5
                  h-[12rem]
                  overflow-hidden
                  hover:border-violet-500/50
                  hover:shadow-violet-500/10
                  transition-all
                  duration-300
                  '
                >

                  <div className='flex gap-4'>

                    <div className='
                    min-w-[5rem]
                    h-[5rem]
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    '>

                      <img
                        src={job.companyLogo?.url}
                        alt={job.title}
                        className='
                        w-full
                        h-full
                        object-cover
                        '
                      />

                    </div>

                    <div className='flex flex-col gap-1 overflow-hidden'>

                      <p className='
                      text-2xl
                      font-bold
                      truncate
                      '>
                        {job.title}
                      </p>

                      <p className='
                      text-lg
                      text-gray-300
                      truncate
                      '>
                        {job.companyName}
                      </p>

                      <p className='
                      text-sm
                      text-gray-400
                      line-clamp-2
                      '>
                        {job.description}
                      </p>

                    </div>

                  </div>

                  <div className='
                  mt-auto
                  flex
                  justify-between
                  flex-wrap
                  gap-3
                  text-sm
                  text-gray-400
                  '>

                    <span>
                      {convertDateFormat(job.createdAt.slice(0, 10))}
                    </span>

                    <span>
                      {job.employmentType}
                    </span>

                    <span className='truncate'>
                      {job.location}
                    </span>

                  </div>

                </Link>

              </motion.div>

            ))}

          </motion.div>

        </div>

      ) : (

        <div className='text-center py-10 text-gray-400 text-lg'>
          No featured jobs available right now
        </div>

      )}
    </>

  )}

</motion.div>
          {/* COMPANIES */}

<motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
  viewport={{ once: true }}
  className='pt-24 w-full'
>

  <div className='text-3xl font-bold pb-10 text-center'>
    Trusted By Top Companies
  </div>

  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 place-items-center'>

    {data.map((e, i) => (

      <motion.div
        key={i}
        initial={{
          opacity: 0,
          y: 15
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: i * 0.04,
          duration: 0.4
        }}
        viewport={{ once: true }}
        whileHover={{
          y: -6,
          scale: 1.04,
          transition: {
            duration: 0.2
          }
        }}
        className='
        group
        bg-white
        rounded-2xl
        w-[120px]
        h-[120px]
        flex
        items-center
        justify-center
        p-5
        grayscale
        hover:grayscale-0
        transition-all
        duration-300
        shadow-md
        hover:shadow-[0_10px_30px_rgba(139,92,246,0.25)]
        hover:bg-gradient-to-br
        hover:from-white
        hover:to-violet-50
        border
        border-transparent
        hover:border-violet-200
        overflow-hidden
        relative
        cursor-pointer
        '
      >

        {/* INSTANT GLOW */}

        <div
          className='
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          bg-violet-400/10
          blur-2xl
          '
        />

        {/* LOGO */}

        <motion.img
          src={e.link}
          alt="company-logo"
          whileHover={{
            scale: 1.08,
            transition: {
              duration: 0.2
            }
          }}
          className='
          relative
          z-10
          max-w-full
          max-h-full
          object-contain
          transition-all
          duration-300
          '
        />

      </motion.div>

    ))}

  </div>

</motion.div>

          {/* TESTIMONIALS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            viewport={{ once: true }}
            className='w-full pt-24'
          >

            <Testimonials />

          </motion.div>

          {/* FINAL SECTION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            viewport={{ once: true }}
            className="pt-24 pb-24 md:px-[14rem] px-[1rem] text-center"
          >

            <p className='text-lg leading-9 text-gray-300'>

              CareerBridge empowers students,
              professionals, and recruiters by
              creating a smarter hiring ecosystem
              built for growth, opportunity,
              and long-term career success.

            </p>

          </motion.div>

        </div>

      </div>
    </>
  )
}