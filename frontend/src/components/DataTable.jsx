"use client"; // Mark as a client component

import { Table } from "@rewind-ui/core"; // Import Rewind UI Table component

export default function DataTable({ columns, data }) {
    const rows = data?.data || []; // Access the 'data' array inside the object
    console.log(rows.map((row) => row._id.$oid));
   return (
    <Table className="text-red">
        <Table.Thead>
        <Table.Tr>
            {columns.map((col) => (
            <Table.Th key={col.key} className="text-black">
                {col.label}
            </Table.Th>
            ))}
        </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {rows.map((row) => (
            <Table.Tr key={row._id.$oid}>
            {columns.map((col) => (
                <Table.Td key={`${row._id.$oid}-${col.key}`} className="text-black">
                {row[col.key]}
                </Table.Td>
            ))}
            </Table.Tr>
        ))}
        </Table.Tbody>
    </Table>
    );
}
