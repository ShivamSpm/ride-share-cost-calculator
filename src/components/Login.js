import { useRef, useState, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from './FormAction';
import { postMethod } from '../constants/axiosRequests';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){

    const [loginState,setLoginState]=useState(fieldsState);

    const errRef = useRef();
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState('');
    const userEmail = loginState['email-address'];
    const userPassword = loginState['password'];

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
            
            console.log("response");
            console.log(response);
            dispatch(login({
                response
            }));
            // sessionStorage.setItem('user', JSON.stringify(response) );
            // cookies.set('user', JSON.stringify(response), { path: '/login' });
            // Cookies.set('user', JSON.stringify(response), { expires: 10, path: '/login' })
            document.cookie = "user="+JSON.stringify(response);
            window.location.reload(false);
            
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
      </>
    )
}