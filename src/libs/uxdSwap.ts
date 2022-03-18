import { u64 } from "@saberhq/token-utils";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Buffer } from "buffer";
import { uint8ArrayToBuffer } from "@solana/buffer-layout";

export interface UxdToSolInstruction {
  signerAccount: PublicKey;
  wsolAccount: PublicKey;
  uxdAccount: PublicKey;
  amountInMax: u64;
}

const UXD_PROGRAM_ID = new PublicKey(
  "UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr"
);

function concatUint8Array(arrays: Uint8Array[]): Uint8Array {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) throw new Error("input array should have element");

  let result = new Uint8Array(totalLength);

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for (let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}

export const uxdToSolInstruction = ({
  signerAccount,
  wsolAccount,
  uxdAccount,
  amountInMax,
}: UxdToSolInstruction): TransactionInstruction => {
  const programId = UXD_PROGRAM_ID;
  const firstBuffer: Uint8Array = new Uint8Array([
    216, 196, 73, 56, 4, 72, 99, 7,
  ]);
  const amountData: Uint8Array = amountInMax.toBuffer();
  const amountBuffer: Uint8Array = new Uint8Array(8);
  for (let i = 0; i < amountData.length; i++) {
    amountBuffer[i] = amountData[amountData.length - 1 - i];
  }
  const endBuffer: Uint8Array = new Uint8Array([5, 0, 0, 0]);
  const uint8ArrayData: Uint8Array = concatUint8Array([
    firstBuffer,
    amountBuffer,
    endBuffer,
  ]);
  const data: Buffer = uint8ArrayToBuffer(uint8ArrayData);
  const keys = [
    { pubkey: signerAccount, isSigner: true, isWritable: true },
    {
      pubkey: new PublicKey("3tbJcXAWQkFVN26rZPtwkFNvC24sPT35fDxG4M7irLQW"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("FHUaC5eXkbSFAmDk4jTsReX9XAKEtDfu34uTpMMUipmp"),
      isSigner: false,
      isWritable: true,
    },
    { pubkey: wsolAccount, isSigner: false, isWritable: true },
    { pubkey: uxdAccount, isSigner: false, isWritable: true },
    {
      pubkey: new PublicKey("So11111111111111111111111111111111111111112"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("DmCcvPHhQr8Gd1esn8Z6GtLAefHbRUdZsVRMcd5oeMfe"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("BgkbbgePeUKJ881UsL4o6Wv2i4qCjbXKi7kFQTYTihEM"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("98pjRuQjK3qA6gXts96PqZT4Ze5QmnCmt3QYjhbUSPue"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("EBDRoayCDDUvDgCimta45ajQeXbexv7aKqJubruqpyvu"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("9BVcYqEQxyccuwznvxXqDkSJFavvTyheiTYk231T1A8S"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("7jH1uLmiB2zbHNe6juZZYjQCrvquakTwd3yMaQpeP8rR"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("2bqJYcA1A8gw4qJFjyE2G4akiUunpd9rP6QzfnxHqSqr"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("AVn3JRGhifPCxjxZsU3tQuo4U4dTHizHzBDGW983tx47"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("2TgaaVoHgnSeEtXvWTx13zQeTf4hYWAMEiMQdcG6EwHi"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("Fu8q5EiFunGwSRrjFKjRUoMABj5yCoMEPccMbUiAT6PD"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("9qUxMSWBGAeNmXusQHuLfgSuYJqADyYoNLwZ63JJSi6V"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("31cKs646dt1YkA3zPyxZ7rUAkxTBz279w4XEobFXcAKP"),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey("11111111111111111111111111111111"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68"),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey("SysvarRent111111111111111111111111111111111"),
      isSigner: false,
      isWritable: false,
    },
  ];
  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
};
