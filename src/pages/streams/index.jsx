import TwitchTopGames from "../../components/TwitchTopGames";
import ScrollReveal from "../../components/ScrollReveal";

const TopGamesStreaming = () => {
   return (
      <ScrollReveal className="py-1 pr-0 sm:pr-1" delay={90}>
         <TwitchTopGames />
      </ScrollReveal>
   );
};

export default TopGamesStreaming;
