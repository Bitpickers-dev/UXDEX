import React from 'react';
import styles from '../styles/Home.module.css';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const style = {
    wrapper: `p-4 w-screen flex justify-between items-center`,
    buttonsContainer: `absolute top-5 right-5 flex w-1/4 justify-end items-center`,
    button: `items-center bg-[#191B1F] cursor-pointer  `,
}

const Header = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.buttonsContainer}>
                <div className={style.button}>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                </div>
            </div>
        </div >
    );
};

export default Header;