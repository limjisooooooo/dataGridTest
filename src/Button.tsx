import React from 'react';
import Touch from './Touch';
import { isPropertySignature } from 'typescript';
import './Base.css';
const Button = (props:React.ButtonHTMLAttributes<HTMLButtonElement>) => {    
    return(
        <>                                    
            <button {...props}>{props.children}<Touch/></button>        
        </>
    )
}
export default Button;