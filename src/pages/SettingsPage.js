import React from "react";
import { useState } from "react";
import { postMethod } from "../constants/axiosRequests";

export default function SettingsPage(){

    const [mileage, setMileage] = useState("");
    const [gasCost, setGasCost] = useState("");
    
    async function handleSubmit(event) {

        event.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        // console.log(user);

        const riderEmail = user["email"];

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
        </>
    )
}