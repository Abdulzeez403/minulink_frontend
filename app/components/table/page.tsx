
"use client"
import { useEffect, useState } from "react";
import { columns } from "./column"
import { DataTable } from "./data-table"
import { useApi } from "@/app/context";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


// interface IProps {
//     urls: any
// }

export default function TablePage() {

    const { urls, getUrlsByUserId } = useApi();
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        getUrlsByUserId(user?.id);
        console.log(urls, "The urls!")

    }, [user?.id])
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={urls as any} />
        </div>
    )
}
