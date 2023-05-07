import Stats from "../components/pages/home/Stats";
import Transactions from "../components/pages/home/Transactions";

function Home() {
  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Stats Component */}
      <Stats />
      {/* Transactions Component */}
      <Transactions />
    </div>
  );
}

export default Home;
