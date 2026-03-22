import TwitchTopStreams from "../../components/TwitchTopStreams";
import ScrollReveal from "../../components/ScrollReveal";

const DisplayMostViewedStreams = () => {
   return (
      <ScrollReveal className="py-1 pr-0 sm:pr-1" delay={90}>
         <TwitchTopStreams />
      </ScrollReveal>
   );
};

export default DisplayMostViewedStreams;
