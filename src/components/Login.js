import { useRef, useState, useEffect, useContext } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from './FormAction';
import { postMethod } from '../constants/axiosRequests';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider'

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const { setAuth } = useContext(AuthContext);
    const [loginState,setLoginState]=useState(fieldsState);
    // const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const userEmail = loginState['email-address'];
    const userPassword = loginState['password']
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, userPassword])

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const response = await postMethod("login", loginState);
            setAuth({userEmail, userPassword})
            console.log("response");
            console.log(response);
            setSuccess(true);
        }catch(err){
            if(!err?.response){
                setErrMsg('No server Response');
            }else if(err.response?.status===400){
                setErrMsg('Missing email or password');
            }else if(err.response?.status===401){
                setErrMsg('Wrong email or password')
            }else{
                setErrMsg('Login failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <>
            {success ? (
                navigate('/home')
            ) :  (
            <section>
            <p ref={errRef}>{errMsg}</p>
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
        </section>
        )}
      </>
    )
}