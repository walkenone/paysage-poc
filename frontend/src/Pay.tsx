import React, { useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';

export default function Pay() {
  const { account, signAndExecuteTransactionBlock } = useWallet();
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handlePayment = async () => {
    if (!account) return alert('Please connect wallet');

    try {
      setStatus('Processing...');
      const tx = {
        kind: 'moveCall',
        data: {
          packageObjectId: '0xYourPackageID',
          module: 'payment_router',
          function: 'create_payment',
          arguments: [merchant, Number(amount), 'USDC'],
          typeArguments: [],
        },
      };
      await signAndExecuteTransactionBlock({ transactionBlock: tx });
      setStatus('Payment successful!');
    } catch (err) {
      console.error(err);
      setStatus('Payment failed.');
    }
  };

  return (
    <div>
      <h2>Pay with PaySage</h2>
      <input placeholder="Merchant address" value={merchant} onChange={e => setMerchant(e.target.value)} />
      <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handlePayment}>Pay</button>
      <p>{status}</p>
    </div>
  );
}