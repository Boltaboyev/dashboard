import React, {useEffect, useState} from "react"
import {ToastContainer, toast} from "react-toastify"
import {my_axios} from "../../../hook/useAxios"
import Form from "../../form/Form"

// icons
import {LuCirclePlus} from "react-icons/lu"
import {FaRegEdit} from "react-icons/fa"
import {BsTrash3} from "react-icons/bs"

const Products = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [products, setProducts] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [productToEdit, setProductToEdit] = useState(null)

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
            toast.success("Product added successfully!")
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (product) => {
        setProductToEdit(product)
        setIsEditModalOpen(true)
    }

    const updateProduct = async (updatedProduct) => {
        try {
            const {data} = await my_axios.put(
                `/${updatedProduct.id}`,
                updatedProduct
            )
            setProducts((prev) =>
                prev.map((product) => (product.id === data.id ? data : product))
            )
            toast.info("Product updated successfully!")
            setIsEditModalOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await my_axios.delete(`/${id}`)
            setProducts((prev) => prev.filter((value) => value.id !== id))
            toast.success("Product deleted successfully!")
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
                                    <div className="flex justify-center items-center gap-[10px]">
                                        <button
                                            onClick={() => handleEdit(value)}
                                            className="flex justify-center items-center rounded-full border border-gray-300 h-[40px] w-[40px] cursor-pointer transition active:scale-90 hover:border-blue-500 hover:text-blue-500">
                                            <FaRegEdit />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(value.id)
                                            }
                                            className="flex justify-center items-center rounded-full border border-gray-300 h-[40px] w-[40px] cursor-pointer transition active:scale-90 hover:border-red-500 hover:text-red-500">
                                            <BsTrash3 />
                                        </button>
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
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-[#0000006d] backdrop-blur-[4px] bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                updateProduct(productToEdit)
                            }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={productToEdit?.name || ""}
                                    onChange={(e) =>
                                        setProductToEdit({
                                            ...productToEdit,
                                            name: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={productToEdit?.price || ""}
                                    onChange={(e) =>
                                        setProductToEdit({
                                            ...productToEdit,
                                            price: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Section
                                </label>
                                <select
                                    value={productToEdit?.section || ""}
                                    onChange={(e) =>
                                        setProductToEdit({
                                            ...productToEdit,
                                            section: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </section>
    )
}

export default Products
