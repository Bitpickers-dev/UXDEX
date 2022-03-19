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
  findUsdcTokenAddress,
  findUxdTokenAddress,
  findWsolTokenAddress,
} from "../libs/findAssociatedTokenAddress";
import { usdcToUxdSwapInstruction } from "../libs/swaberSwap";
import { u64 } from "@saberhq/token-utils";

async function main() {
  const mainAccount = Keypair.fromSecretKey(bs58.decode(PRIVATEKEY));
  const usdcAccount = await findUsdcTokenAddress(mainAccount.publicKey);
  const uxdAccount = await findUxdTokenAddress(mainAccount.publicKey);
  const wsolAccount = await findWsolTokenAddress(mainAccount.publicKey);
  const swapUsdcAmount = new u64(2000000);
  const swapUxdAmount = new u64(
    swapUsdcAmount.mul(new BN(995)).div(new BN(1000)).toNumber()
  );

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const allocateTransaction = new Transaction({
    feePayer: mainAccount.publicKey,
  });

  // USDC to UXD
  allocateTransaction.add(
    usdcToUxdSwapInstruction({
      account: mainAccount.publicKey,
      usdcAccount: usdcAccount,
      uxdAccount: uxdAccount,
      amountIn: swapUsdcAmount,
    })
  );

  // UXD to SOL
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
