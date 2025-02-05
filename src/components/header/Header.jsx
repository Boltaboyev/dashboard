import React from "react"

// icons
import {MdKeyboardArrowRight} from "react-icons/md"
import {CiSearch} from "react-icons/ci"
import {FaRegUser} from "react-icons/fa6"

const Header = () => {
    return (
        <header className="bg-white p-[20px]">
            <nav className="flex justify-between items-center">
                <ul className="flex justify-start items-center gap-[5px]">
                    <li className="cursor-pointer opacity-60 text-[14px] hover:opacity-100">
                        Dashboard
                    </li>
                    <MdKeyboardArrowRight />
                    <li className="cursor-pointer opacity-60 text-[14px] hover:opacity-100">
                        Products
                    </li>
                    <MdKeyboardArrowRight />
                    <li className="cursor-pointer text-[14px]">All Products</li>
                </ul>

                <nav className="flex justify-end items-center gap-[20px]">
                    <div className="flex justify-center items-center border border-gray-200 h-[35px] w-[300px] rounded-md">
                        <button className="h-full px-[10px] cursor-pointer opacity-70 text-[19px]">
                            <CiSearch />
                        </button>

                        <input
                            type="text"
                            placeholder="Search..."
                            className=" outline-none h-full w-full"
                        />
                    </div>

                    <nav className="h-[35px] w-[35px] rounded-full flex justify-center items-center border cursor-pointer border-gray-200">
                        <FaRegUser className=" opacity-50" />
                    </nav>
                </nav>
            </nav>
        </header>
    )
}

export default Header
