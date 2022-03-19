import BN from "bn.js";
import {
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import { uxdToSolInstruction } from "../libs/uxdSwap";
import {
  findUsdcTokenAddress,
  findUxdTokenAddress,
  findWsolTokenAddress,
} from "../libs/findAssociatedTokenAddress";
import { usdcToUxdSwapInstruction } from "../libs/swaberSwap";
import { u64 } from "@saberhq/token-utils";

export async function addUsdcToSolInstruction(
  transaction: Transaction,
  account: PublicKey,
  swapUsdcAmount: u64,
  swapUxdAmount: u64
): Promise<Transaction> {
  const usdcAccount = await findUsdcTokenAddress(account);
  const uxdAccount = await findUxdTokenAddress(account);
  const wsolAccount = await findWsolTokenAddress(account);

  // USDC to UXD
  transaction.add(
    usdcToUxdSwapInstruction({
      account: account,
      usdcAccount: usdcAccount,
      uxdAccount: uxdAccount,
      amountIn: swapUsdcAmount,
    })
  );

  // UXD to SOL
  transaction.add(
    uxdToSolInstruction({
      signerAccount: account,
      wsolAccount: wsolAccount,
      uxdAccount: uxdAccount,
      amountInMax: swapUxdAmount,
    })
  );

  return transaction;
}
