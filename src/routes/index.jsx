import React from "react"
import {Route, Routes} from "react-router-dom"

// components
import MainLayout from "../components/MainLayout"
import Notfound from "../components/NotFound"
import Products from "../components/pages/products/Products"
import Dashboard from "../components/pages/dashboard/Dashboard"
import Orders from "../components/pages/orders/Orders"
import Customers from "../components/pages/customers/Customers"
import Analytics from "../components/pages/analytics/Analytics"

const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Route>
                <Route path="*" element={<Notfound />} />
            </Routes>
        </>
    )
}

export default RoutesComponent
