import React, {useState} from "react"
import {IoCloseSharp} from "react-icons/io5"

const Form = ({isActive, setIsActive, addProduct}) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        section: "active",
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addProduct({
            ...formData,
            price: Number(formData.price),
            img: "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg",
            time: new Date().toLocaleDateString(),
        })
        setFormData({name: "", price: "", section: "active"})
        setIsActive(false)
    }

    return (
        <div
            className={`h-[100vh] w-[420px] bg-slate-300 fixed top-0 ${
                isActive ? "right-0" : "right-[-100%]"
            } p-[100px_20px] z-[999] transition-all duration-300`}>
            <button
                onClick={() => setIsActive(false)}
                className="absolute top-[10px] left-[10px] cursor-pointer h-[40px] w-[40px] rounded-full bg-white border border-gray-300 flex justify-center items-center text-[20px]">
                <IoCloseSharp />
            </button>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-[20px]">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product name"
                    className="border p-[10px] rounded-lg outline-none border-white bg-gray-100"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-[10px] rounded-lg outline-none border-white bg-gray-100"
                />
                <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="border p-[10px] rounded-lg outline-none border-white bg-gray-100">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-400 rounded-md p-[10px] text-white font-medium cursor-pointer active:scale-[.98]">
                    Add product
                </button>
            </form>
        </div>
    )
}

export default Form
