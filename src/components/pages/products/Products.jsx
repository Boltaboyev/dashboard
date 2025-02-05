import React, {useEffect, useState} from "react"

import {my_axios} from "../../../hook/useAxios"
import Form from "../../form/Form"

// icons
import {LuCirclePlus} from "react-icons/lu"
import {HiDotsVertical} from "react-icons/hi"

const Products = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [products, setProducts] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)

    const fetchData = async () => {
        try {
            const {data} = await my_axios.get("/")
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addProduct = async (newProduct) => {
        try {
            const {data} = await my_axios.post("/", newProduct)
            setProducts((prev) => [...prev, data])
        } catch (error) {
            console.error(error)
        }
    }

    const filteredProducts = products.filter((product) =>
        activeTab === "all" ? true : product.section === activeTab
    )

    return (
        <section className="p-[20px] flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    {["all", "active", "draft", "archived"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`p-[7px_15px] rounded-md cursor-pointer ${
                                activeTab === tab
                                    ? "bg-white opacity-70 shadow"
                                    : "bg-slate-200 opacity-60"
                            }`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex justify-center items-center gap-[4px] bg-black border border-black text-white rounded-md cursor-pointer p-[5px_15px]">
                    <LuCirclePlus />
                    <p className="font-medium">Add product</p>
                </button>
            </div>

            <div className="mt-4">
                {filteredProducts.reverse().length > 0 ? (
                    <div className="bg-white border border-gray-300 p-[15px] rounded-lg flex flex-col gap-[20px]">
                        <h1 className="text-[20px] font-medium">Products</h1>

                        <div className="flex flex-col">
                            {filteredProducts.map((value) => (
                                <div
                                    className="grid grid-cols-7 py-[15px] border-b border-gray-300"
                                    key={value.id}>
                                    <div className="col-span-2 flex justify-start items-center gap-[7px]">
                                        <img
                                            src={value?.img}
                                            alt={value?.name}
                                            className="h-[80px] w-[80px] object-contain"
                                        />
                                        <p className="font-medium">
                                            {value?.name}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <p className="text-[14px] capitalize font-medium rounded-2xl border border-gray-300 p-[2px_10px]">
                                            {value?.section}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        ${value?.price}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        {Math.round(Math.random() * 200)}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        {value?.time}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <HiDotsVertical className="text-[20px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">
                        No products found.
                    </p>
                )}
            </div>

            <Form
                isActive={isFormOpen}
                setIsActive={setIsFormOpen}
                addProduct={addProduct}
            />
        </section>
    )
}

export default Products
