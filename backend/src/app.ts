import express, { Request, Response } from "express";
import { connectToGateway } from "./gateway";
import {
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

const PORT = process.env.PORT || 2000;

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
    hlaB27Antibodies,
  } = req.body;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    await createPatient(
      contract,
      patientId,
      age,
      height,
      bloodType,
      pediatricStatus,
      location,
      meldScore,
      hlaB27Antibodies
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

app.post("/api/add-donor", async (req: Request, res: Response) => {
  res.send("Added Donor");
  const donationId = uuidv4();
  const {
    organ,
    age,
    height,
    bloodType,
    pediatricStatus,
    location,
    hlaB27AntigenTest,
  } = req.body;
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    await createDonor(
      contract,
      donationId,
      organ,
      age,
      height,
      bloodType,
      pediatricStatus,
      location,
      hlaB27AntigenTest
    );
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
