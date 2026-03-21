import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

const GameBanner = lazy(() => import("./GameBanner"));
const RawgGamesByGenreAndPlatformId = lazy(() =>
  import("./RawgGamesByGenreAndPlatformId")
);

const MainContent = ({
  allGamesByGenreIdAndPlatformId,
  randomGames,
  selectedGenreName,
  selectedPlatformName,
  currentPage,
  onPrevPage,
  onNextPage,
}) => {
  const bannerGames = Array.isArray(randomGames) ? randomGames : [];

  return (
    <div className="min-w-0 flex-1 border-borderTheme md:border-l md:pl-4 lg:pl-5">
      <div className="py-1 pr-0 sm:pr-1">
        <Suspense fallback={<Loading />}>
          {bannerGames.length > 0 ? (
            <GameBanner randomGames={bannerGames} />
          ) : (
            <Loading />
          )}

          <RawgGamesByGenreAndPlatformId
            gamesByGenreAndPlatformList={allGamesByGenreIdAndPlatformId}
            genreName={selectedGenreName}
            platformName={selectedPlatformName}
            pageNumber={currentPage}
          />
        </Suspense>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pb-4">
          <button
            type="button"
            className="zog-btn min-w-[140px] disabled:pointer-events-none disabled:opacity-40"
            onClick={onPrevPage}
            disabled={currentPage === 1}
            aria-label="Go to previous page of games"
          >
            Previous Page
          </button>
          <button
            type="button"
            className="zog-btn zog-btn-primary min-w-[140px]"
            onClick={onNextPage}
            aria-label="Go to next page of games"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

MainContent.propTypes = {
  allGamesByGenreIdAndPlatformId: PropTypes.arrayOf(PropTypes.object).isRequired,
  randomGames: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
  selectedGenreName: PropTypes.string.isRequired,
  selectedPlatformName: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default MainContent;
