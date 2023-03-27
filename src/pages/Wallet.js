import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="flex flex-col md:flex-row overflow-hidden md:overflow-x-auto
      items-center text-center"
      >
        <div
          className="flex flex-col items-center md:min-w-[340px]
        md:w-[25%] bg-lime-500 md:h-screen pb-10"
        >
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
