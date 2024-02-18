import { Contract } from "@hyperledger/fabric-gateway";

const utf8Decoder = new TextDecoder();

/**
 * This type of transaction would typically only be run once by an application the first time it was started after its
 * initial deployment. A new version of the chaincode deployed later would likely not need to run an "init" function.
 */
export async function initLedger(contract: Contract): Promise<void> {
  console.log(
    "\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger"
  );

  await contract.submitTransaction("InitLedger");

  console.log("*** Transaction committed successfully");
}

/**
 * Evaluate a transaction to query ledger state.
 */
export async function getAllPatients(contract: Contract): Promise<any[]> {
  console.log(
    "\n--> Evaluate Transaction: GetAllPatients, function returns all the patient records on the ledger"
  );

  const resultBytes = await contract.evaluateTransaction("GetAllPatients");

  const resultJson = utf8Decoder.decode(resultBytes);
  const patients = JSON.parse(resultJson);
  console.log("*** All Patients: ", patients);
  return patients;
}

export async function getAllDonors(contract: Contract): Promise<any[]> {
  console.log(
    "\n--> Evaluate Transaction: GetAllDonors, function returns all the organ donor on the ledger"
  );

  const resultBytes = await contract.evaluateTransaction("GetAllDonors");

  const resultJson = utf8Decoder.decode(resultBytes);
  const donors = JSON.parse(resultJson);
  console.log("*** All Donors:", donors);
  return donors;
}

export async function getAllDonations(
  contract: Contract,
  patientId: string
): Promise<any[]> {
  console.log(
    "\n--> Evaluate Transaction: GetAllDonations, function returns all the donations received by the patient"
  );

  const resultBytes = await contract.evaluateTransaction(
    "GetAllDonations",
    patientId
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const donations = JSON.parse(resultJson);
  console.log("*** All Donations: ", donations);
  return donations;
}

export async function getPatient(
  contract: Contract,
  patientId: string
): Promise<void> {
  console.log(
    "\n--> Evaluate Transaction: GetPatient, function returns the patient record with the provided ID"
  );

  const resultBytes = await contract.evaluateTransaction(
    "GetPatient",
    patientId
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const patient = JSON.parse(resultJson);
  console.log("*** Patient: ", patient);
}

export async function getDonor(
  contract: Contract,
  donorId: string
): Promise<void> {
  console.log(
    "\n--> Evaluate Transaction: GetDonor, function returns the donor record with the provided ID"
  );

  const resultBytes = await contract.evaluateTransaction("GetDonor", donorId);

  const resultJson = utf8Decoder.decode(resultBytes);
  const donor = JSON.parse(resultJson);
  console.log("*** Donor: ", donor);
}

export async function getDonation(
  contract: Contract,
  donationId: string
): Promise<void> {
  console.log(
    "\n--> Evaluate Transaction: GetDonation, function returns the donation record with the provided ID"
  );

  const resultBytes = await contract.evaluateTransaction(
    "GetDonation",
    donationId
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const donation = JSON.parse(resultJson);
  console.log("*** Donation: ", donation);
}

/**
 * Submit a transaction synchronously, blocking until it has been committed to the ledger.
 */
export async function createPatient(
  contract: Contract,
  patientId: string,
  age: number,
  height: number,
  bloodType: string,
  pediatricStatus: string,
  location: string,
  meldScore: number,
  hlaB27Antibodies: string
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: CreatePatient, creates new patient record with provide details"
  );

  await contract.submitTransaction(
    "CreatePatient",
    patientId,
    age.toString(),
    height.toString(),
    bloodType,
    pediatricStatus,
    location,
    meldScore.toString(),
    hlaB27Antibodies
  );

  console.log(
    "*** Transaction committed successfully for Patient ID: ",
    patientId
  );
}

/**
 * Submit a transaction synchronously, blocking until it has been committed to the ledger.
 */
export async function createDonor(
  contract: Contract,
  donorId: string,
  organ: string,
  age: number,
  height: number,
  bloodType: string,
  pediatricStatus: string,
  location: string,
  hlaB27AntigenTest: string
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: CreateDonor, creates new donor record with provide details"
  );

  await contract.submitTransaction(
    "CreateDonor",
    donorId,
    organ,
    age.toString(),
    height.toString(),
    bloodType,
    pediatricStatus,
    location,
    hlaB27AntigenTest
  );

  console.log("*** Transaction committed successfully for Donor ID: ", donorId);
}

/*
@Object()
export class Donation {
  @Property()
  public docType: string;

  @Property()
  public donationId: string;

  @Property()
  public patientId: string;

  @Property()
  public donorId: string;
}
*/
export async function createDonation(
  contract: Contract,
  donationId: string,
  patientId: string,
  donorId: string
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: CreateDonation, creates new donation record with provide details"
  );

  await contract.submitTransaction(
    "CreateDonation",
    donationId,
    patientId,
    donorId
  );

  console.log(
    "*** Transaction committed successfully for Donation ID: ",
    donationId
  );
}

export async function updateDnoation(
  contract: Contract,
  donationId: string,
  patientId: string,
  donorId: string
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: UpdateDonation, updates the donation record with provide details"
  );

  await contract.submitTransaction(
    "UpdateDonation",
    donationId,
    patientId,
    donorId
  );

  console.log(
    "*** Transaction committed successfully for Donation ID: ",
    donationId
  );
}
