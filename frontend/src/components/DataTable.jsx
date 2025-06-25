"use client";

import React from "react";
import { Table } from "@rewind-ui/core";

/**
 * Generic DataTable component using Rewind UI
 * @param {Array} columns - Array of column definitions: { key: 'fieldName', label: 'Column Title' }
 * @param {Object|Array} data - Data object with `.data` array or direct array
 */
export default function DataTable({ columns = [], data = [] }) {
    const rows = Array.isArray(data) ? data : data?.data || [];
    console.log("COLUMNS:", columns);
    console.log("ROWS:", rows);

    return (
        <Table className="text-sm w-3/4 m-auto h-full">
            <Table.Thead>
                <Table.Tr>
                    {columns.map((col) => (
                        <Table.Th key={col.key} className="text-black text-2xl font-semibold">
                            {col.label}
                        </Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((row, i) => (
                    <Table.Tr key={row._id?.$oid || i}>
                        {columns.map((col) => (
                            <Table.Td key={`${row._id?.$oid || i}-${col.key}`} className="text-black text-center">
                                {typeof row[col.key] === 'object' && row[col.key]?.$oid
                                    ? row[col.key].$oid
                                    : row[col.key]}
                            </Table.Td>
                        ))}
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
}
