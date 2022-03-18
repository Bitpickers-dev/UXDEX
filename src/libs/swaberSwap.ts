import BN from "bn.js";
import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import { StableSwapConfig, swapInstruction } from "@saberhq/stableswap-sdk";
import { u64 } from "@saberhq/token-utils";

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
