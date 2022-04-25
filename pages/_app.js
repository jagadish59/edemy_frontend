import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/style.css';
import TopNav from "../components/TopNav";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {Provider} from "../context";

 
function MyApp({Component,pageProps}){

    return(< Provider>
    <ToastContainer/>
    <TopNav/>
    <Component {...pageProps}/>
    </Provider>);

}
export default MyApp;