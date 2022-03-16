import React, { useState, useEffect, useCallback } from 'react';
import InputBase from './InputBase';

const BuyForm = ({ data, onPurchase }) => {
    const { name, rate } = data;
    const INIT = { amount: 0, converted: 0 };
    const [exchange, setExchange] = useState(INIT);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setExchange({
            ...exchange,
            converted: Number(exchange.amount / rate).toFixed(4)
        })
    }, [name]);

    useEffect(() => {
        onPurchase(transactions);
    }, [transactions]);

    //* generating unique id:
    //function 
    const generateId = (prefix) => Math.random().toString(36).replace('0.', prefix || '');

    const handleChange = ({ target: { value, name } }) => {
        const val = Number(value.trim());
        const converted = (val / rate).toFixed(4);
        console.log(converted);

        setExchange({
            [name]: val,
            converted: converted,
        });
    };

    //will return a memorized version of the callback that only changes if one of the dependencies has changed.
    const makePurchase = useCallback((e) => {
        e.preventDefault();
        if (!exchange.amount) {
            alert('Please Enter Amount');
        }

        //holds data
        const payload = {
            ...exchange,
            name,
            id: generateId('tranX_id'),
        }

        //! check
        setTransactions([...transactions, payload]);
    }, [exchange, transactions]);


    console.log('transX', transactions);



    return (
        <form onSubmit={makePurchase} className="form">
            <div className="input-group mb-3">
                <InputBase name="amount" textLabel="USD" onChange={handleChange} />
                <i className="fas fa-exchange-alt" />
                <InputBase value={exchange.converted} disabled textLabel={name} />
            </div>
            <input className="btn btn-primary" type="submit" value="Purchase" />
        </form>
    )
}

export default BuyForm;