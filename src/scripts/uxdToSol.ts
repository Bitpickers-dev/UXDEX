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
import { uxdToSolInstruction } from "../libs/uxdSwap";
import {
  findUxdTokenAddress,
  findWsolTokenAddress,
} from "../libs/findAssociatedTokenAddress";

async function main() {
  const mainAccount = Keypair.fromSecretKey(bs58.decode(PRIVATEKEY));
  const wsolAccount = await findWsolTokenAddress(mainAccount.publicKey);
  const uxdAccount = await findUxdTokenAddress(mainAccount.publicKey);
  const swapUxdAmount = new BN(1000000);

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const allocateTransaction = new Transaction({
    feePayer: mainAccount.publicKey,
  });

  allocateTransaction.add(
    uxdToSolInstruction({
      signerAccount: mainAccount.publicKey,
      wsolAccount: wsolAccount,
      uxdAccount: uxdAccount,
      amountInMax: swapUxdAmount,
    })
  );

  const tx = await sendAndConfirmTransaction(connection, allocateTransaction, [
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
