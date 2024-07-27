
"use client"
import { useEffect, useState } from "react";
import { columns } from "./column"
import { DataTable } from "./data-table"
import { useApi } from "@/app/context";



export default function TablePage() {



    const { urls, fetchUrls } = useApi()

    useEffect(() => {
        fetchUrls();

    }, [])



    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={urls as any} />
        </div>
    )
}
