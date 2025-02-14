import { Car } from "@/CarDetails/CarInterfaces";
import StarIcon from "@/assets/star-icon/star-icon.png";
import { Images } from "@/assets/images/images";
import { DynamicImageKeys } from "@/assets/images/DynamicImageKeys";

interface CarDetailsSetupProps {
  car: Car;
  unitPreference: "metric" | "imperial"; // Added prop for unit preference
  handleGoBack: () => void;
}

const CarDetailsSetup: React.FC<CarDetailsSetupProps> = ({ car, unitPreference, handleGoBack }) => {
  // Helper to parse both strings and numbers into valid numbers
  const parseMetricValue = (value: string | number | undefined): number => {
    if (value === undefined || value === null) {
      console.error("Value is undefined or null", value);
      return 0; // Return the number as-is if it's already a valid number
    }
    if (typeof value === "number") {
      return value;
    }
    return parseFloat(value.replace(",", ".")); // Handle string with commas
  };

  // Custom conversion function for Top Speed
  const convertTopSpeed = (speed: string | number | undefined): string => {
    if (speed === undefined || speed === null) {
      console.error("Top Speed value is undefined or null", speed);
      return unitPreference === "imperial" ? "0 mph" : "0 km/h"; // Return the number as-is if it's already a valid number
    }
    const parsedSpeed = parseMetricValue(speed);

    // Custom conversion factor to match in-game value
    const conversionFactor = 0.6214;

    return unitPreference === "imperial"
      ? `${(parsedSpeed * conversionFactor).toFixed(1)} mph` // Match game's rounding
      : `${parsedSpeed.toFixed(1)} km/h`;
  };

  // Display stats as-is for Acceleration, Handling, and Nitro
  const displayStatAsIs = (value: string | number): string => {
    const parsedValue = parseMetricValue(value);
    return `${parsedValue.toFixed(2)}`; // Keep the precision for other stats
  };

  // Dynamic image path resolution
  const carImagePath = (() => {
    const normalizedModel = car.Model.toLowerCase().replace(/\./g, "-").replace(/\s+/g, "-");
    const dynamicKey = `${car.Brand.toLowerCase().replace(/\s+/g, "-")}-${normalizedModel}`;
    return DynamicImageKeys[dynamicKey] && Images[DynamicImageKeys[dynamicKey]]
      ? Images[DynamicImageKeys[dynamicKey]]
      : Images["placeholder"];
  })();

  return (
    <div className="car-detail">
      <div>
        <button className="backBtn" onClick={handleGoBack}>
          Back
        </button>
      </div>
      <div>
        <h1 className="carName">{car.Brand} {car.Model}</h1>
      </div>
      <div>
        <div className="carImageContainer">
          <img src={carImagePath} alt={`${car.Brand} ${car.Model}`} className="carImage" />
        </div>
      </div>
      <div className="carDetailTables">

        <table className="carInfoTable">
          <tbody>
            <tr>
              <th className="tableHeader2" colSpan={2}>Class {car.Class}</th>
            </tr>
            <tr>
              <td>
                <span>
                  {Array.from({ length: car.Stars }, (_, i) => (
                    <img key={i} src={StarIcon} alt="star" style={{ width: "30px", height: "30px", marginRight: "4px" }} />
                  ))}
                </span>
              </td>
            </tr>
            <tr>
              <td className="maxRank">Max Rank: {car.Max_Rank}</td>
            </tr>
          </tbody>
        </table>
        <table className="carInfoTable">
          <tbody>
            <th className="tableHeader2" colSpan={2}>Gold Max Stats</th>
            <tr>
              <td>Top Speed</td>
              <td>{convertTopSpeed(car.Top_Speed)}</td>
            </tr>
            <tr>
              <td>Acceleration</td>
              <td>{displayStatAsIs(car.Acceleration)}</td>
            </tr>
            <tr>
              <td>Handling</td>
              <td>{displayStatAsIs(car.Handling)}</td>
            </tr>
            <tr>
              <td>Nitro</td>
              <td>{displayStatAsIs(car.Nitro)}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CarDetailsSetup;
