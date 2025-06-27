"use client";

import React from "react";
import { Table, Badge, Dropdown, Button } from "@rewind-ui/core";
import { DotsThree } from "@phosphor-icons/react";

export default function DataTable({ columns = [], data = [] }) {
    const rows = Array.isArray(data) ? data : data?.data || [];

    return (
        <div className="w-full max-w-5xl mx-auto border rounded-md overflow-hidden">
            <Table outerBorders={false} size="lg" striped hoverable radius="lg" className="table-fixed w-full">
                <Table.Thead>
                    <Table.Tr className="bg-white sticky top-0 z-10">
                        {columns.map((col) => (
                            <Table.Th key={col.key} className="text-black text-md font-semibold text-center bg-white">
                                {col.label}
                            </Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>

                {/* ✅ Wrap only tbody rows in scrollable area */}
                <Table.Tbody>
                    <tr>
                        <td colSpan={columns.length} className="p-0">
                            <div className="max-h-[500px] overflow-y-auto">
                                <table className="table-fixed w-full">
                                    <tbody>
                                        {rows.map((row, i) => (
                                            <Table.Tr key={row._id?.$oid || i}>
                                                {columns.map((col) => {
                                                    const value = row[col.key];

                                                    if (col.key === "level") {
                                                        return (
                                                            <Table.Td key={`${i}-${col.key}`}>
                                                                <Badge color="purple" tone="light">{value}</Badge>
                                                            </Table.Td>
                                                        );
                                                    }

                                                    if (col.key === "status") {
                                                        const active = value === "Enrolled";
                                                        return (
                                                            <Table.Td key={`${i}-${col.key}`}>
                                                                <Badge color={active ? "green" : "red"} tone="outline">
                                                                    <div className={`w-1.5 h-1.5 ${active ? "bg-green-500" : "bg-red-500"} animate-pulse rounded-full mr-1.5`} />
                                                                    {value}
                                                                </Badge>
                                                            </Table.Td>
                                                        );
                                                    }

                                                    if (col.key === "actions") {
                                                        return (
                                                            <Table.Td key={`${i}-${col.key}`} align="right">
                                                                <Dropdown itemColor="gray" tone="light" placement="bottom-end" shadow="sm" withChevron={false}>
                                                                    <Dropdown.Trigger>
                                                                        <Button color="white" tone="light" size="sm" shadow="sm" icon>
                                                                            <DotsThree size={18} />
                                                                        </Button>
                                                                    </Dropdown.Trigger>
                                                                    <Dropdown.Content className="min-w-[7rem]">
                                                                        <Dropdown.Item>View</Dropdown.Item>
                                                                        <Dropdown.Item>Edit</Dropdown.Item>
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item color="red">Remove</Dropdown.Item>
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </Table.Td>
                                                        );
                                                    }

                                                    return (
                                                        <Table.Td key={`${i}-${col.key}`} className="text-black text-center">
                                                            {typeof value === "object" && value?.$oid ? value.$oid : value}
                                                        </Table.Td>
                                                    );
                                                })}
                                            </Table.Tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </Table.Tbody>
            </Table>
        </div>
    );
}
