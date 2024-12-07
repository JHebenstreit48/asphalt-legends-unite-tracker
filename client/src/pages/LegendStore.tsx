import Header from "../components/Header";
import PageTab from "../components/PageTab";
import LegendStoreTables from "../LegendStore/LegendStoreTables";

export default function LegendStorePrices() {
  return (
    <>
      <div>

        <PageTab title="Legend Store Prices">

          <Header text="Asphalt Legends Unite" />

          <LegendStoreTables />

        </PageTab>

      </div>
      
    </>
  );
}