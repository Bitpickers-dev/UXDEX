import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
}

const WSOL_TOKEN_MINT_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

const UXD_TOKEN_MINT_ADDRESS = new PublicKey(
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"
);

const USDC_TOKEN_MINT_ADDRESS = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

export async function findWsolTokenAddress(walletAddress: PublicKey) {
  return await findAssociatedTokenAddress(
    walletAddress,
    WSOL_TOKEN_MINT_ADDRESS
  );
}

export async function findUxdTokenAddress(walletAddress: PublicKey) {
  return await findAssociatedTokenAddress(
    walletAddress,
    UXD_TOKEN_MINT_ADDRESS
  );
}
export async function findUsdcTokenAddress(walletAddress: PublicKey) {
  return await findAssociatedTokenAddress(
    walletAddress,
    USDC_TOKEN_MINT_ADDRESS
  );
}
