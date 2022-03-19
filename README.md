# UXD-OTCExchange

[UXD](https://uxd.fi/)は無期限先物でヘッジした合成ポジションを担保にステーブルコインUXDを発行するプロトコルです.


我々はUXDは担保資産としてBTC，ETH，SOLの3種類を受け付けていることから, [Saber Protocol](https://app.saber.so/#/swap)との連携によりBTC-USDC，ETH-USDC，SOL-USDCのOTC取引所ができるという視点からプロジェクトをスタートさせました.

<img width="770" alt="スクリーンショット 2022-03-19 13 50 18" src="https://user-images.githubusercontent.com/47593288/159107418-ee42174e-b75e-49c4-ab89-95dd792ee9cf.png">


このOTC取引所の長所は**取引額が大きくなっても(Uniswapなどと比較して)スリッページが大きくなりにくい**点です

現段階では,USDC→SOLのswapにのみ対応しており, 逆方向のswapはできません.
具体的にはSaber ProtocolとUXDにてそれぞれ提供されているUSDC→UXDとUXD→SOLのswapを結合しました.
これによりユーザーは今まではできなかった直接的なUSDC→SOLの交換ができるようになりました.


# 対応ウォレット
- Phantom
- Solflare
- Torus
- Ledger
- Sollet
- Slope
- Sollet(Extension)
