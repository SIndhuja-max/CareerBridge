// Sidebar.jsx

import React from "react";
import {
  MdOutlineDashboard,
  MdOutlineCreateNewFolder,
  MdOutlineFeaturedPlayList
} from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Sidebar = ({ sideTog }) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <MdOutlineDashboard size={20} />,
      path: "/admin/dashboard"
    },
    {
      title: "Post Job",
      icon: <MdOutlineCreateNewFolder size={20} />,
      path: "/admin/postJob"
    },
    {
      title: "All Jobs",
      icon: <BsBriefcase size={20} />,
      path: "/admin/allJobs"
    },
    {
      title: "Applications",
      icon: <MdOutlineFeaturedPlayList size={20} />,
      path: "/admin/allApplications"
    },
    {
      title: "Users",
      icon: <AiOutlineUser size={20} />,
      path: "/admin/allUsers"
    }
  ];

  const sidebarVariants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: 0
    }
  };

  return (
    <motion.div
      className={`${
        sideTog ? "flex" : "hidden"
      } fixed left-0 top-0 z-50 min-h-screen w-72 bg-[#0B1120] border-r border-gray-800 shadow-2xl flex-col`}
      variants={sidebarVariants}
      initial="hidden"
      animate={sideTog ? "visible" : "hidden"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* Branding */}
      <div className="px-8 pt-10 pb-8 border-b border-gray-800">
        <p className="text-3xl font-bold text-white tracking-wide">
          CareerBridge
        </p>
        <p className="text-sm text-gray-400 pt-2">
          Recruiter Control Panel
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3 px-5 pt-8">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#111827] hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};