import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
const DataContext = React.createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    let data = { users, setUsers, products, setProducts, transactions, setTransactions };

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_TRANSACTIONS}/getalltransactions`)
                .then((response) => {
                    setTransactions(response.data.transactions);
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get(`${process.env.REACT_APP_USERS}/getallusers`)
                .then((response) => {
                    setUsers(response.data.users);
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get(`${process.env.REACT_APP_PRODUCTS}/getallproducts`)
                .then((response) => {
                    setProducts(response.data.products);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}