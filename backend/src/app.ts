import express, { Request, Response } from "express";
import { connectToGateway } from "./gateway";
import { createAsset } from "./chaincode";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// Hyperledger Fabric API Endpoints to hit SDK
app.post("/api/add-patient", async (req: Request, res: Response) => {
  res.send("Added Patient");
  const { client, gateway, network, contract } = await connectToGateway();
  try {
    await createAsset(contract, `asset${Date.now()}`);
  } finally {
    gateway.close();
    client.close();
  }
});

app.get("/api/query-all-patients", (req: Request, res: Response) => {
  res.send("Query All Patients");
});

app.get("/api/query-patient/:id", (req: Request, res: Response) => {
  res.send("Query Patient");
});