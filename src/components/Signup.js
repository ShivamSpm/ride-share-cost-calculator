import { useRef, useState, useEffect} from 'react';
import { signupFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from './FormAction';
import { postMethod } from '../constants/axiosRequests';

const fields=signupFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [signupState,setSignupState]=useState(fieldsState);
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const userEmail = signupState['email-address'];
    const userPassword = signupState['password']

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, userPassword])

    const handleChange=(e)=>{
        setSignupState({...signupState,[e.target.id]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const response = await postMethod("signup", signupState);
            console.log(response);
            setSuccess(true);
        }catch(err){
            console.log(err.response);
            if(!err?.response){
                setErrMsg('No server Response');
            }else if(err.response?.status===400){
                setErrMsg('Missing email or password');
            }else if(err.response?.status===409){
                setErrMsg('This email already exists')
            }else{
                setErrMsg('Signup failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <>  
            {success ?
             <p>Account created successfully</p> :
                <p ref={errRef}>{errMsg}</p>}
            <form onSubmit={handleSubmit}>
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
            <FormAction text="Signup"/>
        </form>
      </>
    )
}