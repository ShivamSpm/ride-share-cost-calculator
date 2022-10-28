import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import getMethod, { postMethod } from "../constants/axiosRequests";
import { getCookie } from "../App";

export default function SettingsPage(){

    const [mileage, setMileage] = useState("");
    const [gasCost, setGasCost] = useState("");
    const [currentMileage, setCurrentMileage] = useState("");
    const [currentGasCost, setCurrentGasCost] = useState("");

    useEffect(() => {
        getCurrentMileageAndCost();
    }, []);

    async function getCurrentMileageAndCost(){
        const user1 = JSON.parse(getCookie('user'));
        const riderEmail = user1["email"];
        const response = await getMethod("/getCurrentMileageAndCost", riderEmail);
        setCurrentMileage(response['Mileage']);
        setCurrentGasCost(response['FuelCost']);

    }

    async function handleSubmit(event) {

        event.preventDefault();
        // const user = JSON.parse(sessionStorage.getItem('user'));
        // console.log(user);
        const user1 = JSON.parse(getCookie('user'));
        const riderEmail = user1["email"];

        const mileageAndCostJson = {
            "email": riderEmail,
            "mileage": mileage,
            "gasCost": gasCost
          }

        try{
            await postMethod("/saveMileageAndCost", mileageAndCostJson);
            
        }catch(err){
            console.log(err);
        }
        
        setMileage("");
        setGasCost("");

        console.log("sda");
      }
    
    return(
        <>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mileage">Mileage</label>
                <input style={{margin:'0px 30px'}}
                    id="mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    required
                />
                <label htmlFor="gasCost">Gas Cost</label>
                <input style={{margin:'0px 30px'}}
                    id="gasCost"
                    type="number"
                    value={gasCost}
                    onChange={(e) => setGasCost(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                Current Mileage: {currentMileage}
            </div>
            <div>
                Current Gas Cost: {currentGasCost}
            </div>
        </>
    )
}