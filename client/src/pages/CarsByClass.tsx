import { useState, useEffect } from "react";
import Header from "../components/Header";
import PageTab from "../components/PageTab";
import "../CSS/Header.css";
import "../CSS/Page.css";
import ClassTables from "../CarsByClass/classTables";
import "../CSS/CarsByClassTables.css";

interface Car {
    Id: number;
    Brand: string;
    Model: string;
    Stars: number;
}

export default function CarsByClass() {
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>("D");

    useEffect(() => {
        console.log("Selected class:", selectedClass); // Debug log
        fetch(`http://localhost:5000/api/cars/${selectedClass}`)
            .then((response) => {
                console.log("Fetch response:", response); // Debug log
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data); // Debug log
                setCars(data);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, [selectedClass]);

    return (
        <>
            <div>
                <PageTab title="Cars by Class">
                    <Header text="Cars by Class" />
                    {/* Dropdown for selecting class */}
                    <div>
                        <select
                            onChange={(e) => setSelectedClass(e.target.value)}
                            value={selectedClass}
                            className="class-select"
                        >
                            <option value="D">D Class</option>
                            <option value="C">C Class</option>
                            <option value="B">B Class</option>
                            <option value="A">A Class</option>
                            <option value="S">S Class</option>
                        </select>
                    </div>
                    {/* Pass data to ClassTables */}
                    <ClassTables cars={cars} selectedClass={selectedClass} />
                </PageTab>
            </div>
        </>
    );
}