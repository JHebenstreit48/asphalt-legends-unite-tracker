import CarModel from "../models/car"; // Adjust to your actual CarModel file location
import { carData } from "../seeds/carData";
import { connectDB, disconnectDB } from "../seeds/index"; // Adjust to the correct path

(async function seedDatabase() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Connected to MongoDB.");
    await CarModel.collection.drop();
    console.log("Seeding database...");
    for (const car of carData) {
      await CarModel.create(car);
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await disconnectDB(); // Disconnect after seeding
  }
})();
