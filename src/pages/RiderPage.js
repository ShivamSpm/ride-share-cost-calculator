import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import getMethod from "../constants/axiosRequests";

export default function RiderPage(){
    const [dropDownMenuData, setDropDownMenuData] = useState([]);

    const getDropdownMenuData = async() =>{
        let response = []
        try{
        response = await getMethod("getAllUsers", "");
        }catch(err){
            console.log(err);
        }

        return response;
    }
    
    useEffect(()=>{
        getDropdownMenuData().then((data) => setDropDownMenuData(data));
    }, [])
    
    return(
        <>
            <h2>Rider</h2>
            <div>
                <Dropdown data={dropDownMenuData}/>
                
            </div>
        </>
    )
}