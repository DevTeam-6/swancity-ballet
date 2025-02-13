"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Text } from '@rewind-ui/core'; // Import Rewind UI components

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the Flask API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/data');
                setData(response.data.data); // Assuming the API returns data in `data.data`
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
};

export default DataDisplay;
