
import HomePage from "../app/home/detail"
import TablePage from "./components/table/page";
import { ApiProvider } from "./context";
import HomeLayout from "./homeLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const Home = async () => {

    let isUserAuthenticated = false;
    try {
        const session = await getKindeServerSession();
        isUserAuthenticated = await session.isAuthenticated();
    } catch (error) {
        console.error("Failed to fetch session:", error);
    }

    return (
        <ApiProvider>


            <main className="">
                <HomeLayout isUserAuthenticated={isUserAuthenticated} />
                {/* {isUserAuthenticated ? (<HomePage />) : null} */}

                <HomePage isUserAuthenticated={isUserAuthenticated} />

                <TablePage />

            </main>
        </ApiProvider>

    );
}
export default Home
