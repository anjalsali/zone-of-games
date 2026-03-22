import { useState } from "react";
import LinksSidebar from "../../components/LinksSidebar";
import TwitchTopStreams from "../../components/TwitchTopStreams";
import ScrollReveal from "../../components/ScrollReveal";
import useSyncedMainColumnHeight from "../../hooks/useSyncedMainColumnHeight";

const DisplayMostViewedStreams = () => {
    const [mainColumnEl, setMainColumnEl] = useState(null);
    const mainColumnHeightPx = useSyncedMainColumnHeight(mainColumnEl);
    const isHeightLocked =
        typeof mainColumnHeightPx === "number" && mainColumnHeightPx > 0;

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start">
            <aside
                className={`zog-store-sidebar hidden w-[min(300px,92vw)] max-w-[min(300px,92vw)] shrink-0 text-text md:flex md:min-h-0 md:flex-col ${
                    isHeightLocked ? "overflow-hidden" : "md:self-stretch"
                }`}
                style={
                    isHeightLocked
                        ? { height: mainColumnHeightPx, maxHeight: mainColumnHeightPx }
                        : undefined
                }
            >
                <ScrollReveal className="flex h-full min-h-0 flex-col py-3 pr-2" delay={40}>
                    <LinksSidebar />
                </ScrollReveal>
            </aside>
            <div
                ref={setMainColumnEl}
                className="min-w-0 flex-1 border-borderTheme md:self-start md:border-l md:pl-4 lg:pl-5"
            >
                <ScrollReveal className="py-1 pr-0 sm:pr-1" delay={90}>
                    <TwitchTopStreams />
                </ScrollReveal>
            </div>
        </div>
    )
}
export default DisplayMostViewedStreams;
