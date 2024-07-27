// components/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { FiCopy } from "react-icons/fi";
import QRCode from "qrcode.react";
import { Url } from "@/app/types";
import { FaLink } from "react-icons/fa6";
import Image from "next/image"

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

export const columns: ColumnDef<Url>[] = [
    {
        id: "shortLink",
        header: "ShortLink",
        cell: ({ row }) => {
            const shortLink = `${row.original.domain}/${row.original.shortUrl}`;

            const handleCopy = () => {
                navigator.clipboard.writeText(shortLink);
                alert("Short link copied to clipboard!");
            };

            return (
                <div className="flex items-center">
                    <a
                        href={shortLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 text-[#C9CED6] hover:underline pr-4"
                    >
                        {shortLink}
                    </a>
                    <FiCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-700 "
                        size={25}
                        onClick={handleCopy}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "originalUrl",
        header: "OriginalUrl",
        cell: ({ row }) => {
            const originalUrl = row.original.originalUrl;
            const faviconUrl = isValidUrl(originalUrl)
                ? `${originalUrl}/favicon.ico`
                : '/fallback-favicon.ico';

            return (
                <div className="flex items-center">
                    <Image
                        src={`https://${originalUrl}/favicon.ico`}
                        alt="favicon"
                        width={24}
                        height={24}
                        className="w-6 h-6 mr-2"
                    // onError={(e) => {
                    //     e.currentTarget.src = '/fallback-favicon.ico'; // Fallback favicon
                    // }}
                    />
                    <p>{originalUrl}</p>
                </div>
            );
        },
    },
    {
        id: "qrcode",
        header: "QR Code",
        cell: ({ row }) => {
            const shortLink = `${row.original.domain}/${row.original.shortUrl}`;
            return <QRCode value={shortLink} size={34} />;
        },
    },
    {
        accessorKey: "visitCount",
        header: "Clicks",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <div className="flex items-center">
                    <span
                        className={`px-2 py-1 rounded-full text-white ${status === "active" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {status.toUpperCase()}
                    </span>
                    <FaLink className=" bg-green-600 p-2 rounded-full text-white" size={30} color="white" />
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },

];
