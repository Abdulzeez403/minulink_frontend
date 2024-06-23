
"use client"
import { useEffect, useState } from "react";
import { Url, columns } from "./column"
import { DataTable } from "./data-table"



export default function TablePage() {

    const [datas, setDatas] = useState([])


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/shorten');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDatas(data)
            console.log(data); // Handle the data from the server
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();

    }, [])



    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={datas} />
        </div>
    )
}
