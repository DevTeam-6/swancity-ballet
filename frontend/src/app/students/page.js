import DataTable from "@/components/DataTable"; // Import the reusable component

async function getStudents() {
    const res = await fetch(`${process.env.API_BASE_URL}/students`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch students");
    return res.json();
}

export default async function StudentsPage() {
    const students = await getStudents();

    const studentColumns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
    ];

    return <DataTable columns={studentColumns} data={students} />;
}
