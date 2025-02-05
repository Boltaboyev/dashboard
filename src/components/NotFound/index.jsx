import React from "react"

import {useNavigate} from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()

    return (
        <section class="bg-white h-[100vh] w-full flex flex-col justify-center items-center gap-[15px]">
            <div className="flex flex-col gap-0 text-center text-[17px]">
                <p>This page is unavailable.</p>
                <p>Maybe we should look for something else?</p>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="border p-[5px_20px] rounded-md cursor-pointer active:scale-[.98]">
                Back to main page
            </button>
        </section>
    )
}

export default Notfound
