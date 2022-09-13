import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from './FormAction';
import { postMethod } from '../constants/axiosRequests';
const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () =>{
        console.log(loginState);
        postMethod("login", loginState);
    }

    return(
        <form onSubmit={handleSubmit}>
        <div>
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                )
            }
        </div>
        
        <FormAction text="Login"/>
      </form>
    )
}