import stations from "../mock/station";
import StationCard from "../components/pages/home/StationCard";

function Stations() {
  return (
    <main className="m-6 bg-white p-8 shadow-md">
      <h1 className="text-4xl font-semibold my-4"> Stations </h1>

      <hr className="border my-4" />

      <div className="grid grid-cols-3 items-center gap-6 mt-8">
        {stations.map(
          ({
            location,
            name,
            slotsAvailable,
            googleMapLink,
            imgUrl,
            active,
          }) => (
            <StationCard
              location={location}
              name={name}
              slotsAvailable={slotsAvailable}
              key={location + Math.random()}
              imgUrl={imgUrl}
              googleMapLink={googleMapLink}
              active={active}
            />
          )
        )}
      </div>
    </main>
  );
}

export default Stations;
