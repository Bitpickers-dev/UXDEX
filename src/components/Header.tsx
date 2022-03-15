import React from 'react';
import styles from '../styles/Home.module.css';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => {
    return (
        < div className={styles.container} >
            <div className={styles.walletButtons}>
                <WalletMultiButton />
                <WalletDisconnectButton />
            </div>
        </div >
    );
};

export default Header;