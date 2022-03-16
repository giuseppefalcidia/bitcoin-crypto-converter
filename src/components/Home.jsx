import React, { useState } from 'react';
import CryptoTile from './CryptoTile';
import BuyForm from './BuyForm';
import Transactions from './Transactions';

import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import xem from '../assets/xem.png';

const Home = () => {
    const tiles = [
        { id: 1, icon: btc, name: 'BTC', rate: 33834 },
        { id: 2, icon: eth, name: 'ETH', rate: 1394 },
        { id: 3, icon: xem, name: 'XEM', rate: 0.2708 },
    ]

    const [selectedTile, setSelectedState] = useState(tiles[0]);
    const [list, setList] = useState([]);

    const handleSelect = (data) => {
        setSelectedState(data)
    }

    const buildList = (list) => {
        setList(list)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="d-flex">
                        {tiles.map((coin) => (
                            <CryptoTile
                                key={coin.id}
                                data={coin}
                                selected={coin.id === selectedTile.id}
                                onClick={handleSelect}
                            />
                        ))}
                    </div>
                    <BuyForm data={selectedTile} onPurchase={buildList} />
                </div>
                <div className="col-6">
                    <Transactions list={list} />
                </div>
            </div>
        </div>
    )
}

export default Home;