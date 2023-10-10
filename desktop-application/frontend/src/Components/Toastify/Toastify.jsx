import React, {useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = (props) =>  {
    const notify = () => toast(props.msg);
    useEffect(() => {
        if(props.notify) notify();
    }, [props.notify])


  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Toastify