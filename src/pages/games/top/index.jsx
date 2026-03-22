import { useState, useEffect } from "react";
import rawgApi from "../../../services/rawgApi";
import RawgTopRatedGames from "../../../components/RawgTopRatedGames";
import ScrollReveal from "../../../components/ScrollReveal";

const TopRatedGames = () => {
   const [allGamesList, setAllGamesList] = useState([]);

   useEffect(() => {
      const fetchRawgAllGamesList = async () => {
         try {
            const response = await rawgApi.getGamesList;
            setAllGamesList(response.data.results);
         } catch (error) {
            console.error("Error fetching top rated games:", error);
         }
      };
      fetchRawgAllGamesList();
   }, []);

   return (
      <ScrollReveal className="py-1 pr-0 sm:pr-1" delay={90}>
         {allGamesList?.length > 0 && <RawgTopRatedGames gamesList={allGamesList} />}
      </ScrollReveal>
   );
};

export default TopRatedGames;
