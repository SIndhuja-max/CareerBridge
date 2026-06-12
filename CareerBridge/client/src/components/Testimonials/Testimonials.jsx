import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import testimonials from './testimonials';

function Testimonials() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const itemsPerPage = isSmallScreen ? 1 : 3;

  useEffect(() => {

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () =>
      window.removeEventListener('resize', checkScreenSize);

  }, []);

  const handleNext = () => {

    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % testimonials.length
    );

  };

  const handlePrev = () => {

    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) %
        testimonials.length
    );

  };

  const getVisibleTestimonials = () => {

    const end = currentIndex + itemsPerPage;

    if (end > testimonials.length) {

      return [
        ...testimonials.slice(currentIndex),
        ...testimonials.slice(
          0,
          end - testimonials.length
        )
      ];

    }

    return testimonials.slice(currentIndex, end);

  };

  return (

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
      className='pt-24 flex flex-col gap-8 md:px-[1rem] px-[1rem]'
    >

      {/* TITLE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
        viewport={{ once: true }}
        className='text-3xl titleT text-center'
      >
        What Our Users Say
      </motion.div>

      {/* TESTIMONIALS */}

      <div className='relative w-full flex justify-center items-center'>

        {/* LEFT BUTTON */}

        <motion.div
          whileHover={{
            scale: 1.08
          }}
          whileTap={{
            scale: 0.95
          }}
          className='absolute left-[-15px] md:left-[-30px] top-1/2 transform -translate-y-1/2 z-20'
        >

          <button
            onClick={handlePrev}
            className='bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg'
          >

            <FaChevronLeft size={22} />

          </button>

        </motion.div>

        {/* CARDS */}

        <div className='w-full flex justify-center overflow-hidden'>

          <AnimatePresence mode="wait">

            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: 40
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -40
              }}
              transition={{
                duration: 0.45
              }}
              className='flex gap-5 w-full'
            >

              {getVisibleTestimonials().map(
                (testimonial, index) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4
                    }}
                    whileHover={{
                      translateY: -4
                    }}
                    className='flex-shrink-0 w-full md:w-1/3 p-2'
                  >

                    <div className='w-full p-5 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-300 hover:border-violet-500/40 hover:bg-gray-900 shadow-lg'>

                      {/* USER */}

                      <div className='flex items-center gap-4 p-2'>

                        <motion.img
                          whileHover={{
                            scale: 1.05
                          }}
                          transition={{
                            duration: 0.2
                          }}
                          src={testimonial.image}
                          alt={testimonial.name}
                          className='w-16 h-16 rounded-full object-cover border border-gray-700'
                        />

                        <div>

                          <p className='text-lg font-semibold text-white'>
                            {testimonial.name}
                          </p>

                          <p className='text-sm text-gray-400'>
                            {testimonial.position},
                            {" "}
                            {testimonial.company}
                          </p>

                        </div>

                      </div>

                      {/* TEXT */}

                      <p className='mt-4 text-gray-300 leading-7 text-sm md:text-base'>

                        {testimonial.text}

                      </p>

                    </div>

                  </motion.div>

                )
              )}

            </motion.div>

          </AnimatePresence>

        </div>

        {/* RIGHT BUTTON */}

        <motion.div
          whileHover={{
            scale: 1.08
          }}
          whileTap={{
            scale: 0.95
          }}
          className='absolute right-[-15px] md:right-[-30px] top-1/2 transform -translate-y-1/2 z-20'
        >

          <button
            onClick={handleNext}
            className='bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg'
          >

            <FaChevronRight size={22} />

          </button>

        </motion.div>

      </div>

    </motion.div>

  );

}

export default Testimonials;