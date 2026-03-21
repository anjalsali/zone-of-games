import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import GamePagination from "./GamePagination";

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
  totalPages,
  totalCount,
  pageSize,
  hasNextPage,
  onPageChange,
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
          />
        </Suspense>

        <GamePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          hasNextPage={hasNextPage}
          onPageChange={onPageChange}
        />
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
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MainContent;
