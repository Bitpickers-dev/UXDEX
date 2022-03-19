import BN from "bn.js";
import {
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { PRIVATEKEY } from "./.env";
import * as bs58 from "bs58";
import { u64 } from "@saberhq/token-utils";
import { addUsdcToSolInstruction } from "../libs/composeSwap";

async function main() {
  const mainAccount = Keypair.fromSecretKey(bs58.decode(PRIVATEKEY));
  const swapUsdcAmount = new u64(2000000);
  const swapUxdAmount = new u64(
    swapUsdcAmount.mul(new BN(995)).div(new BN(1000)).toNumber()
  );

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const allocateTransaction = new Transaction({
    feePayer: mainAccount.publicKey,
  });

  const transaction = await addUsdcToSolInstruction(
    allocateTransaction,
    mainAccount.publicKey,
    swapUsdcAmount,
    swapUxdAmount
  );

  const tx = await sendAndConfirmTransaction(connection, transaction, [
    mainAccount,
    mainAccount,
  ]);

  console.log(tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
