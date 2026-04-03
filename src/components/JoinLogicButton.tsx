import { history, useModel } from 'umi';
import { useEffect } from "react";

export default function (props: any) {
    const { refresh } = useModel('@@initialState');
    useEffect(() => {
      refresh();
  
    }, [])
    if (localStorage.getItem("token")) {
        const userName = localStorage.getItem("userName") != null ? localStorage.getItem("userName") : "Anon";
        const exitJoin = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            refresh();
        };
        
        return (
            <>
                <span
                style={{color: 'white'}}>

                    {userName} <a onClick={exitJoin}>Выйти</a>
                </span>
            </>
        );
        
    }
    else {
        const join = () => {
            history.push('/join');
        };
        return (
            <>
                <span>

                    <a 
                    onClick={join}
                    >Войти</a>
                </span>

            </>
        );
    }
}