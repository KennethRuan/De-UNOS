import express, { Request, Response } from "express";
import { connectToGateway } from "./gateway";
import {
  createDonation,
  createDonor,
  createPatient,
  getAllDonors,
  getAllPatients,
  getDonor,
  getPatient,
} from "./chaincode";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3051;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// Hyperledger Fabric API Endpoints to hit SDK
app.post("/api/add-patient", async (req: Request, res: Response) => {
  res.send("Added Patient");
  const patientId = uuidv4();
  const {
    age,
    height,
    bloodType,
    pediatricStatus,
    location,
    meldScore,
    organNeeded,
    hlaB27Antibodies,
    terraWearableId,
  } = req.body;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    await createPatient(
      contract,
      patientId,
      age,
      bloodType,
      hlaB27Antibodies,
      height,
      location,
      meldScore,
      organNeeded,
      pediatricStatus,
      terraWearableId
    );
  } finally {
    gateway.close();
    client.close();
  }
});

app.get("/api/query-all-patients", async (req: Request, res: Response) => {
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    // Asynchronous operation to get all patients
    const data = await getAllPatients(contract);
    console.log("Success", data);
    // Send the response here, after fetching the data successfully
    res.send(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Failed to fetch patients", error);
    res.status(500).send("Failed to query all patients");
  } finally {
    // Close the gateway and client connections in the finally block
    gateway.close();
    client.close();
  }
});

app.get("/api/query-patient/:id", async (req: Request, res: Response) => {
  res.send("Query Patient");
  const patientId = req.params.id;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    const data = await getPatient(contract, patientId);
    console.log("Success", data);
    res.send(data);
  } finally {
    gateway.close();
    client.close();
  }
});

const findMatch = async (ctx: any, donor: any) => {
  let allPatients = await getAllPatients(ctx);
  console.log("Searching through patients", allPatients);
  console.log("Donor", donor);
  let matches = allPatients.filter(
    (patient) =>
      patient.organNeeded === donor.organ &&
      patient.bloodType === donor.bloodType &&
      // patient.age <= donor.age + 2 &&
      // patient.age >= donor.age - 2 &&
      patient.hlaB27Antibodies == donor.hlaB27AntigenTest
  );
  console.log("Matches", matches);
  if (matches.length == 0) {
    return null;
  }

  matches.forEach((patient) => {
    // const distanceScore = calculateDistanceScore(patient, donor);
    const distanceScore = 1;
    const meldScore = patient.meldScore;
    patient.totalScore = meldScore * 0.75 + distanceScore * 0.25;
  });

  // Sort based on total score, highest scores at top of list
  matches.sort((a, b) => b.totalScore - a.totalScore);

  const id = uuidv4();
  // createDonation(ctx, id, donor.id, matches[0].id);
  return matches[0];
};

function calculateDistanceScore(patient: any, donor: any) {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = patient.latitude * (Math.PI / 180); // Convert degrees to radians
  const lat2 = donor.latitude * (Math.PI / 180);
  const deltaLat = (donor.latitude - patient.latitude) * (Math.PI / 180);
  const deltaLon = (donor.longitude - patient.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
}

app.post("/api/add-donor", async (req: Request, res: Response) => {
  res.send("Added Donor");
  const donationId = uuidv4();
  const {
    organ,
    age,
    height,
    blood_type,
    pediatric_status,
    location,
    antigen_test,
  } = req.body;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    await createDonor(
      contract,
      donationId,
      organ,
      age,
      height,
      blood_type,
      pediatric_status,
      location,
      antigen_test
    );

    await findMatch(contract, {
      id: donationId,
      organ,
      age,
      height,
      bloodType: blood_type,
      pediatricStatus: pediatric_status,
      location,
      hlaB27AntigenTest: antigen_test,
    });
  } finally {
    gateway.close();
    client.close();
  }
});

app.get("/api/query-all-donors", async (req: Request, res: Response) => {
  res.send("Query All Donors");
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    const data = await getAllDonors(contract);
    console.log("Success", data);
    res.send(data);
  } finally {
    gateway.close();
    client.close();
  }
});

app.get("/api/query-donor/:id", async (req: Request, res: Response) => {
  res.send("Query Donor");
  const donorId = req.params.id;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    const data = await getDonor(contract, donorId);
    console.log("Success", data);
    res.send(data);
  } finally {
    gateway.close();
    client.close();
  }
});

app.get("/api/add-donation", async (req: Request, res: Response) => {
  res.send("Added Donation");
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    // await createDonation(contract, donationId, organ, age, height, bloodType, pediatricStatus, location, hlaB27AntigenTest);
  } finally {
    gateway.close();
    client.close();
  }
});
