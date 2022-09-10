import { useState } from 'react';
import { signupFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from './FormAction';

const fields=signupFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [signupState,setSignupState]=useState(fieldsState);

    const handleChange=(e)=>{
        setSignupState({...signupState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        registerAccount();
    }

    const registerAccount = () =>{
        
        
    }

    return(
        <form>
        <div>
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup"/>
      </form>
    )
}