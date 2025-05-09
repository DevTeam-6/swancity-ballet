'use client'

import { useState } from 'react';

export default function Create() {
    const [formData, setFormData] = useState({
        family_name: '',
        last_name: '',
        address: '',
        email: '',
        phone_number: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5001/api/families', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert('Family created!');
        } else {
            alert('Error creating family.');
        }
    };

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Create a New Family</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="family_name" className="block text-gray-600 font-medium mb-2">Family Name</label>
                        <input
                            name="family_name"
                            type="text"
                            value={formData.family_name}
                            onChange={handleChange}
                            id="family_name"
                            className="w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Family Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-gray-600 font-medium mb-2">Last Name</label>
                        <input
                            name="last_name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleChange}
                            id="last_name"
                            className="w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Last Name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-gray-600 font-medium mb-2">Address</label>
                    <input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        id="address"
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Address"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Email"
                    />
                </div>

                <div>
                    <label htmlFor="phone_number" className="block text-gray-600 font-medium mb-2">Phone Number</label>
                    <input
                        name="phone_number"
                        type="text"
                        value={formData.phone_number}
                        onChange={handleChange}
                        id="phone_number"
                        className="w-full border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Phone Number"
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
