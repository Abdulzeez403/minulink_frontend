import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import HomePage from "../app/home/detail"
import TablePage from "./components/table/page";
import { ApiProvider, useApi } from "./context";
import HomeLayout from "./homeLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useEffect } from "react";


const Home = async () => {



    let isUserAuthenticated = false;
    try {
        const session = await getKindeServerSession();
        isUserAuthenticated = await session.isAuthenticated();
    } catch (error) {
        console.error("Failed to fetch session:", error);
    }

    return (


        <main className="">
            <HomeLayout isUserAuthenticated={isUserAuthenticated} />
            <HomePage isUserAuthenticated={isUserAuthenticated} />
            <TablePage />

        </main>

    );
}
export default Home
