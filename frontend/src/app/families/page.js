"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Text } from '@rewind-ui/core'; // Import Rewind UI components

export default function Families() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false); // Track if the component is mounted

    useEffect(() => {
        setMounted(true); // Set to true once the component is mounted
    }, []);

    // Fetch data from the Flask API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/families');
                setData(response.data.data); // Assuming the API returns data in `data.data`
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!mounted) return null; // Return nothing before the component is mounted (to avoid SSR mismatches)
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <div>
            {data.map((item) => (
                <Card key={item._id.$oid} style={{ marginBottom: '1rem' }}>
                    <Text>First Name: {item.first_name}</Text>
                    <Text>Last Name: {item.last_name}</Text>
                </Card>
            ))}
        </div>
    );
}
