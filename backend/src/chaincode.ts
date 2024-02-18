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
export async function getAllAssets(contract: Contract): Promise<void> {
  console.log(
    "\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger"
  );

  const resultBytes = await contract.evaluateTransaction("GetAllAssets");

  const resultJson = utf8Decoder.decode(resultBytes);
  const result = JSON.parse(resultJson);
  console.log("*** Result:", result);
}

/**
 * Submit a transaction synchronously, blocking until it has been committed to the ledger.
 */
export async function createAsset(
  contract: Contract,
  assetId: string
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: CreateAsset, creates new asset with ID, Color, Size, Owner and AppraisedValue arguments"
  );

  await contract.submitTransaction(
    "CreateAsset",
    assetId,
    "yellow",
    "5",
    "Tom",
    "1300"
  );

  console.log("*** Transaction committed successfully");
}

/**
 * Submit transaction asynchronously, allowing the application to process the smart contract response (e.g. update a UI)
 * while waiting for the commit notification.
 */
export async function transferAssetAsync(contract: Contract): Promise<void> {
  console.log(
    "\n--> Async Submit Transaction: TransferAsset, updates existing asset owner"
  );
  const assetId = `asset${Date.now()}`;

  const commit = await contract.submitAsync("TransferAsset", {
    arguments: [assetId, "Saptha"],
  });
  const oldOwner = utf8Decoder.decode(commit.getResult());

  console.log(
    `*** Successfully submitted transaction to transfer ownership from ${oldOwner} to Saptha`
  );
  console.log("*** Waiting for transaction commit");

  const status = await commit.getStatus();
  if (!status.successful) {
    throw new Error(
      `Transaction ${status.transactionId} failed to commit with status code ${status.code}`
    );
  }

  console.log("*** Transaction committed successfully");
}

export async function readAssetByID(
  contract: Contract,
  assetId: string
): Promise<void> {
  console.log(
    "\n--> Evaluate Transaction: ReadAsset, function returns asset attributes"
  );

  const resultBytes = await contract.evaluateTransaction("ReadAsset", assetId);

  const resultJson = utf8Decoder.decode(resultBytes);
  const result = JSON.parse(resultJson);
  console.log("*** Result:", result);
}

/**
 * submitTransaction() will throw an error containing details of any error responses from the smart contract.
 */
export async function updateNonExistentAsset(
  contract: Contract
): Promise<void> {
  console.log(
    "\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error"
  );

  try {
    await contract.submitTransaction(
      "UpdateAsset",
      "asset70",
      "blue",
      "5",
      "Tomoko",
      "300"
    );
    console.log("******** FAILED to return an error");
  } catch (error) {
    console.log("*** Successfully caught the error: \n", error);
  }
}
