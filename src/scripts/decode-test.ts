import { u64 } from "@saberhq/token-utils";
import { uint8ArrayToBuffer } from "@solana/buffer-layout";

async function main() {
  const uint8ArrayValue: Uint8Array = new Uint8Array([
    64, 66, 15, 0, 0, 0, 0, 0,
  ]);
  const bufferValue = uint8ArrayToBuffer(uint8ArrayValue);
  const value = u64.fromBuffer(bufferValue);
  console.log(value.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
