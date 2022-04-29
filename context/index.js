import { useReducer, createContext, useEffect } from "react";
import axios from 'axios';
import {useRouter} from 'next/router'
const initialState = {
    user: null

}
const Context = createContext();

const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }



}

const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(rootReducer, initialState);


    useEffect(() => {
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem('user'))
        })
    }, [])

    const router=useRouter()

    axios.interceptors.response.use(
        function (response) {
            //any status code that lie within  the  range of 2XX
            console.log("this is from axios interceptors");
            return response;

        },
    function (error) {
            //any outside of range the 2XX 
            console.log("this is from axios interceptors error bluck");
            let res = error.response;
            console.log('error from axios',error)
            if (res.status === 401 && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('https://udemybackends.herokuapp.com/api/logout')
                    .then(data => {
                        console.log("/401 error> Logout")
                        dispatch({type:"LOGOUT"})
                        window.localStorage.removeItem('user')
                        router.push('/login');

                    })
                    .catch(err => {
                        console.log(err)
                        reject(error);
                    })
                })
            }
            return Promise.reject(error)

        }
    )


    useEffect(()=>{

        
        const getCsrfToken=async()=>{
        const {data}=await axios.get('https://udemybackends.herokuapp.com/api/csrf-token')
        console.log(data);
        axios.defaults.headers["X-CSRF-Token"]=data.getCsrfToken;
        }

        getCsrfToken();

    },[])


    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    )
}



export { Context, Provider }