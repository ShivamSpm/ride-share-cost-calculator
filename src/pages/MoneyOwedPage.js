import React from "react";
import { useEffect, useState } from "react";
import getMethod from "../constants/axiosRequests";
import { getCookie } from "../App";


export default function MoneyOwedPage(){
    const [moneyOwedData, setMoneyOwedData] = useState([]);
    const [moneyYouOweData, setMoneyYouOweData] = useState([]);

    useEffect(() =>  {
        getMoneyOwedData();
        getMoneyYouOweData();
    }, []);

    const getMoneyOwedData = async () =>  {
        // const user = JSON.parse(sessionStorage.getItem('user'));
        const user1 = JSON.parse(getCookie('user'));
        console.log(user1);
        const riderEmail = user1["email"];
        const response = await getMethod("/getMoneyOwed", riderEmail);
        setMoneyOwedData(response);
        console.log(response);
    };
    const getMoneyYouOweData = async () =>  {
        // const user = JSON.parse(sessionStorage.getItem('user'));
        const user1 = JSON.parse(getCookie('user'));
        const passengerId = user1['Name'];
        const response = await getMethod("/getMoneyYouOwe", passengerId);
        setMoneyYouOweData(response);
        console.log(response);
    };

    return(
        <>
            {/* <h2>Money Owed</h2> */}
            <h3>Money Owed</h3>
            {moneyOwedData.map((item) => (
                <React.Fragment key={item.id}>
                    <div>{item['PassengerId']} - ${item['MoneyOwed']}</div>
                </React.Fragment>
                )
            )}
            <h3>Money You Owe</h3>
            {moneyYouOweData.map((item) => (
                <React.Fragment key={item.id}>
                    <div>{item['RiderName']} - ${item['MoneyOwed']}</div>
                </React.Fragment>
                )
            )}
        </>
    )
}