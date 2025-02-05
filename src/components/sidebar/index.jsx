import React from "react"
import {NavLink} from "react-router-dom"

//icons
import {IoLogoVercel} from "react-icons/io5"
import {GoGear} from "react-icons/go"
import {RxDashboard} from "react-icons/rx"
import {LuShoppingCart} from "react-icons/lu"
import {LuPackage} from "react-icons/lu"
import {BiGroup} from "react-icons/bi"
import {BsGraphUp} from "react-icons/bs"

const Sidebar = () => {
    return (
        <aside className="w-[60px] flex flex-col justify-between items-center p-[20px_0] h-[100vh] sticky top-0 border-r border-[#e2e8f0] bg-white">
            <div className=" flex flex-col justify-start items-center gap-[25px]">
                <IoLogoVercel className="h-[35px] w-[35px] rounded-full flex justify-center items-center bg-black text-white text-center p-[10px] cursor-pointer" />

                <NavLink
                    to="/"
                    className="text-[#64748b] text-xl hover:text-black transition duration-[.2s] w-full flex justify-center items-center">
                    <LuShoppingCart />
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className="text-[#64748b] text-xl hover:text-black transition duration-[.2s] w-full flex justify-center items-center">
                    <RxDashboard />
                </NavLink>

                <NavLink
                    to="/orders"
                    className="text-[#64748b] text-xl hover:text-black transition duration-[.2s] w-full flex justify-center items-center">
                    <LuPackage />
                </NavLink>

                <NavLink
                    to="/customers"
                    className="text-[#64748b] text-[22px] hover:text-black transition duration-[.2s] w-full flex justify-center items-center">
                    <BiGroup />
                </NavLink>

                <NavLink
                    to="/analytics"
                    className="text-[#64748b] text-[18px] hover:text-black transition duration-[.2s] w-full flex justify-center items-center">
                    <BsGraphUp />
                </NavLink>
            </div>

            <GoGear className="text-[#64748b] text-xl hover:text-black transition duration-[.2s] w-full flex justify-center items-center cursor-pointer" />
        </aside>
    )
}

export default Sidebar
