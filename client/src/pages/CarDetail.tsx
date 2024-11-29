import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/CarDetail.css";

interface Car {
  Id: number; // Matches the database field
  Brand: string;
  Model: string;
  Class: string;
  Stars: number;
  Max_Rank: number;
  Top_Speed: number;
  Acceleration: number;

}

const CarDetail = () => {
  const { id } = useParams(); // Extracting id from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState(false);


    const fetchCarDetails = async (id: number) => {
      console.log(id);
      fetch(`http://localhost:3001/api/cars/detail/${id}`)
      .then((response) => {
        console.log("Fetch response:", response); // Debug log
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Fetched data:", data); // Debug log
    })
    .catch((error) => console.error("Fetch error:", error));
      // try {
        
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch car details.");
      //   }
      //   const data: Car = await response.json();
      //   console.log(data);
      //   setCar(data);
      // } catch (err) {
      //   console.error("Error fetching car details:", err);
      //   setError(true);
      // }
    };

    useEffect(() => {
      if (id) {
    fetchCarDetails(Number(id));
  }
  }, [id]);

  if (error) {
    return <div className="error-message">Error loading car details. Please try again later.</div>;
  }

  if (!car) {
    return <div className="loading-message">Loading car details...</div>;
  }

  return (
    <div className="carDetailContainer">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="carInfo">
        <p>Class: {car.Class}</p>
        <p>Brand: {car.Brand}</p>
        <p>Model: {car.Model}</p>
        <p>Stars: {car.Stars}</p>
        <p>Max Rank: {car.Max_Rank}</p>
        <p>Top Speed: {car.Top_Speed}</p>
        <p>Acceleration: {car.Acceleration} </p>
      </div>
    </div>
  );
};

export default CarDetail;
