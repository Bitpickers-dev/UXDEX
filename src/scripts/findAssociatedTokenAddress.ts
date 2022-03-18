import { PublicKey } from "@solana/web3.js";
import { findAssociatedTokenAddress } from "../libs/findAssociatedTokenAddress";

async function main() {
  const walletAddress = new PublicKey(
    "3hDxwhscddL1DnysYXesTaDv8LHrcJYnC4TaZTUmXZpr"
  );
  const uxdTokenMintAddress = new PublicKey(
    "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"
  );
  const wsolTokenMintAddress = new PublicKey(
    "So11111111111111111111111111111111111111112"
  );

  // expected to be
  // uxd: GdZRDQJQpfSuhsjN2SANPGc8mJqwddiNn9tEo5zXsTZf
  // wsol: 3yeQwkKXGpwxoThSVmG2V1g7xvpiy5aYoCAK8a6msLX2
  const uxdAddress = await findAssociatedTokenAddress(
    walletAddress,
    uxdTokenMintAddress
  );
  const wsolAddress = await findAssociatedTokenAddress(
    walletAddress,
    wsolTokenMintAddress
  );
  console.log(uxdAddress.toString());
  console.log(wsolAddress.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
