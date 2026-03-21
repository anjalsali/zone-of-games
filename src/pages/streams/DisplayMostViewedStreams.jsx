import LinksSidebar from "../../components/LinksSidebar";
import TwitchTopStreams from "../../components/TwitchTopStreams";

const DisplayMostViewedStreams = () => {
    return (
        <div className="flex w-full flex-col md:flex-row md:items-start">
            <aside className="browse-aside hidden w-60 max-w-[240px] shrink-0 text-text md:block md:min-h-[50vh]">
                <div className="sticky top-14 py-2 pr-2">
                    <LinksSidebar />
                </div>
            </aside>
            <div className="min-w-0 flex-1 border-borderTheme md:border-l md:pl-4 lg:pl-5">
                <div className="py-1 pr-0 sm:pr-1">
                    <TwitchTopStreams />
                </div>
            </div>
        </div>
    )
}
export default DisplayMostViewedStreams;
