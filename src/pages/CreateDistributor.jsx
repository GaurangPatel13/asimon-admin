import React from "react";
import { useForm } from "react-hook-form";
import { createFranchiseeAPI } from "../api/admin-api";

import Swal from 'sweetalert2';
const FranchiseeForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            email: data.email,
            ownerName: data.ownerName,
            location: data.location,
            address: data.address,
            pinCode: data.pinCode,
            state: data.state,
            city: data.city,
            mobile: {
                primary: data.mobilePrimary,
                secondary: data.mobileSecondary,
            },
            gstNumber: data.gstNumber,
            bankDetails: {
                bankName: data.bankName,
                branchName: data.branchName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifscCode,
            },
            panNumber: data.panNumber,
            tokenBlock: [],

        };

        try {
            const response = await createFranchiseeAPI(payload);

            if (response.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Franchisee Registered Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    return (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-3xl font-semibold mb-8 text-center">Franchisee Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: "name", label: "Business Name", required: true },
                    { name: "email", label: "Email ", required: true },
                    { name: "ownerName", label: "Owner Name", required: true },
                    { name: "location", label: "Location" },
                    { name: "address", label: "Address", required: true },
                    { name: "pinCode", label: "Pin Code", required: true, pattern: /^\d{6}$/ },
                    { name: "state", label: "State", required: true },
                    { name: "city", label: "City", required: true },
                    { name: "mobilePrimary", label: "Primary Mobile", required: true, pattern: /^[6-9]\d{9}$/ },
                    { name: "mobileSecondary", label: "Secondary Mobile", pattern: /^[6-9]\d{9}$/ },
                    { name: "gstNumber", label: "GST Number", pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/ },
                    { name: "bankName", label: "Bank Name" },
                    { name: "branchName", label: "Branch Name" },
                    { name: "accountNumber", label: "Account Number" },
                    { name: "ifscCode", label: "IFSC Code", pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/ },

                ].map(({ name, label, required, pattern }) => (
                    <div key={name} className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                        <input
                            {...register(name, { required, pattern })}
                            placeholder={label}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors[name] && <span className="text-red-500 text-sm">Invalid {label}</span>}
                    </div>
                ))}

                {/* KYC Status Dropdown */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">KYC Status</label>
                    <select {...register("kycStatus")} className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-4 transition-all">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FranchiseeForm;
