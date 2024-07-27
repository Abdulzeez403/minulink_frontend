// components/DataTable.tsx
"use client";

import React, { useState } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Url } from "@/app/types";
import UpdateForm from "@/app/home/update";
import { FaTrash, FaEdit } from "react-icons/fa";
import { StatusFilter } from "./statusfilter";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState<Url | null>(null);
    const [sorting, setSorting] = React.useState<SortingState>([])


    const handleUpdate = (url: Url) => {
        setCurrentUrl(url);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = (updatedUrl: Url) => {
        // Implement the logic to update the URL in the data
        console.log("Updated URL:", updatedUrl);
        // Close the modal
        setIsModalOpen(false);
    };

    const handleDelete = async (urlId: string) => {
        // Implement the logic to delete the URL
        console.log(`Delete URL with ID: ${urlId}`);
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            // columnFilters,
            // columnVisibility,
        },
    })

    const statusOptions = ['All', 'Active', 'Inactive']
    const selectedStatus = (table.getColumn("status")?.getFilterValue() as string) ?? 'All'

    const handleFilterChange = (status: string) => {
        table.getColumn("status")?.setFilterValue(status === 'All' ? undefined : status)
    }

    return (
        <div className="">
            <div className="py-4">

                <StatusFilter
                    options={statusOptions}
                    selectedStatus={selectedStatus}
                    onStatusChange={handleFilterChange}
                />
            </div>
            <Table>
                <TableHeader className="bg-[#181E29]  ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-white font-bold p-6">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                            <TableHead className="text-white font-bold">Actions</TableHead>
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="border-none">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-8 border-l-0 border-r-0 border-[#0b101b] border-r-none my-2 bg-[#141a25]"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-[#C9CED6]">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdate(row.original)}
                                            className="px-2 py-3 text-sm text-white  rounded-full border-2 border-slate-300  flex items-center space-x-1"
                                        >
                                            <FaEdit />
                                            {/* <span>Update</span> */}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row.original.id)}
                                            className="px-2 py-3 text-sm text-white border-2 border-grey-200 rounded-full flex items-center space-x-1"
                                        >
                                            <FaTrash />
                                            {/* <span>Delete</span> */}
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {currentUrl && (
                <UpdateForm
                    initialValues={currentUrl}
                    onSubmit={handleUpdateSubmit}
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
