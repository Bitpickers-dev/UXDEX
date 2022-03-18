import BN from "bn.js";
import {
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
import { StableSwapConfig, swapInstruction } from "@saberhq/stableswap-sdk";
import { PRIVATEKEY } from "./.env";
import * as bs58 from "bs58";
import { uxdToSolInstruction } from "../libs/uxdSwap";
import {
  findUsdcTokenAddress,
  findUxdTokenAddress,
  findWsolTokenAddress,
} from "../libs/findAssociatedTokenAddress";
import { u64 } from "@saberhq/token-utils";

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

export interface UsdcToUxdSwapInstruction {
  account: PublicKey;
  usdcAccount: PublicKey;
  uxdAccount: PublicKey;
  amountIn: u64;
}

// https://registry.saber.so/data/pools-info.mainnet.json

const USDC_TO_UXD_CONFIG: StableSwapConfig = {
  swapAccount: new PublicKey("KEN5P7p3asnb23Sw6yAmJRGvijfAzso3RqfyLAQhznt"),
  authority: new PublicKey("HaNqpJUQeH2t6SB3tDJAtKV52fJM9rV1mGZrRrqMRZo1"),
  swapProgramID: new PublicKey("SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ"),
  tokenProgramID: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
};

const POOL_UXD_ADDRESS = new PublicKey(
  "9zj4aX38Uxf3h6AUjS4EipWS8mwbEofasHAf3a1uKGds"
);

const POOL_USDC_ADDRESS = new PublicKey(
  "CwQDG1MWunn9cLNwcZLd8YBacweSR7ARo32w4mLua1Yr"
);

const ADMIN_UXD_ADDRESS = new PublicKey(
  "3czPMjjuHNb1yAahyQVmGiN7AQAGaws8xpFcSskCj2oe"
);

export const usdcToUxdSwapInstruction = ({
  account,
  usdcAccount,
  uxdAccount,
  amountIn,
}: UsdcToUxdSwapInstruction): TransactionInstruction => {
  const minimumAmountOut = new u64(amountIn.mul(new BN(0.995)).toNumber());
  return swapInstruction({
    config: USDC_TO_UXD_CONFIG,
    userAuthority: account,
    userSource: usdcAccount,
    poolSource: POOL_USDC_ADDRESS,
    poolDestination: POOL_UXD_ADDRESS,
    userDestination: uxdAccount,
    adminDestination: ADMIN_UXD_ADDRESS,
    amountIn: amountIn,
    minimumAmountOut: minimumAmountOut,
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
