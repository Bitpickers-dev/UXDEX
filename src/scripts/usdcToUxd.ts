import {
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { PRIVATEKEY } from "./.env";
import * as bs58 from "bs58";
import {
  findUsdcTokenAddress,
  findUxdTokenAddress,
} from "../libs/findAssociatedTokenAddress";
import { u64 } from "@saberhq/token-utils";
import { usdcToUxdSwapInstruction } from "../libs/swaberSwap";

async function main() {
  const mainAccount = Keypair.fromSecretKey(bs58.decode(PRIVATEKEY));
  const usdcAccount = await findUsdcTokenAddress(mainAccount.publicKey);
  const uxdAccount = await findUxdTokenAddress(mainAccount.publicKey);
  const swapUsdcAmount: u64 = new u64(1000000);

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const allocateTransaction = new Transaction({
    feePayer: mainAccount.publicKey,
  });

  allocateTransaction.add(
    usdcToUxdSwapInstruction({
      account: mainAccount.publicKey,
      usdcAccount: usdcAccount,
      uxdAccount: uxdAccount,
      amountIn: swapUsdcAmount,
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
