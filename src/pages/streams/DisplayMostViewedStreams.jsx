import LinksSidebar from "../../components/LinksSidebar";
import TwitchTopStreams from "../../components/TwitchTopStreams";

const DisplayMostViewedStreams = () => {
    return (
        <div className="flex h-full min-h-0 w-full flex-1 flex-col md:flex-row">
            <aside className="zog-store-sidebar hidden w-[280px] max-w-[min(280px,92vw)] shrink-0 text-text md:flex md:min-h-0 md:flex-col">
                <div className="flex h-full min-h-0 flex-1 flex-col py-3 pr-2">
                    <LinksSidebar />
                    <div className="min-h-0 min-w-0 flex-1" aria-hidden="true" />
                </div>
            </aside>
            <div className="min-h-0 min-w-0 flex-1 border-borderTheme md:self-start md:border-l md:pl-4 lg:pl-5">
                <div className="py-1 pr-0 sm:pr-1">
                    <TwitchTopStreams />
                </div>
            </div>
        </div>
    )
}
export default DisplayMostViewedStreams;
