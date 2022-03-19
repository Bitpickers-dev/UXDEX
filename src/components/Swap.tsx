import { Button } from "@mui/material";
import { u64 } from "@saberhq/token-utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { FC, ReactNode, useCallback } from "react";
import BN from "bn.js";
import { addUsdcToSolInstruction } from "../libs/composeSwap";

type Props = {
  amount: number;
};

// import { useNotify } from "./notify";

export const SendTransaction: FC<Props> = ({ amount }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  //   const notify = useNotify();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      //   notify("error", "Wallet not connected!");
      return;
    }

    let signature: TransactionSignature = "";
    let swapAmount: number = amount;
    try {
      const transaction = new Transaction();
      const swapUsdcAmount = new u64(swapAmount);
      const swapUxdAmount = new u64(
        swapUsdcAmount.mul(new BN(995)).div(new BN(1000)).toNumber()
      );

      const tx = await addUsdcToSolInstruction(
        transaction,
        publicKey,
        swapUsdcAmount,
        swapUxdAmount
      );

      signature = await sendTransaction(tx, connection);
      //   notify("info", "Transaction sent:", signature);

      await connection.confirmTransaction(signature, "processed");
      //   notify("success", "Transaction successful!", signature);
    } catch (error: any) {
      //   notify("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Send Transaction
    </Button>
  );
};
