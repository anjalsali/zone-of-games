import { useState, useEffect } from "react";
import rawgApi from "../../../services/rawgApi";
import LinksSidebar from "../../../components/LinksSidebar";
import RawgTopRatedGames from "../../../components/RawgTopRatedGames";

const TopRatedGames = () => {
    const [allGamesList, setAllGamesList] = useState([]);

    useEffect(() => {
        fetchRawgAllGamesList();
    }, []);

    const fetchRawgAllGamesList = async () => {
        try {
            const response = await rawgApi.getGamesList;

            setAllGamesList(response.data.results);
        } catch (error) {
            console.error("Error fetching top rated games:", error);
        }
    };

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start">
            <aside className="browse-aside hidden w-60 max-w-[240px] shrink-0 text-text md:block md:min-h-[50vh]">
                <div className="sticky top-14 py-2 pr-2">
                    <LinksSidebar />
                </div>
            </aside>
            <div className="min-w-0 flex-1 border-borderTheme md:border-l md:pl-4 lg:pl-5">
                <div className="py-1 pr-0 sm:pr-1">
                    {allGamesList?.length > 0 && (
                        <RawgTopRatedGames gamesList={allGamesList} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TopRatedGames;
