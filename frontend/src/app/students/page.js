'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch(`http://localhost:5000/students`);
                if (!res.ok) throw new Error("Failed to fetch students");
                const data = await res.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const studentColumns = [
        { key: "first_name", label: "Name" },
        { key: "last_name", label: "Email" },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <DataTable columns={studentColumns} data={students} />;
}
