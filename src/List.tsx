import React, { HTMLAttributes } from 'react';
import './Base.css';

const List = (props:HTMLAttributes<HTMLDivElement>) => {    
    return(
        <div className='List' style={props.style}>
            {props.children}            
        </div>
    )
}
interface ListItemProps extends HTMLAttributes<HTMLDivElement>, React.Attributes{
    value?: number|string;
}
const ListItem = (props:ListItemProps) => {    
    return(                
        <div className='ListItem' onClick={props.onClick} onMouseDown={props.onMouseDown}>
            <span style={{lineHeight:'3vw'}}>
                {props.children}
            </span>
            <input type={'hidden'} value={props.value}/>
        </div>
    )
}
export {List as default, List, ListItem};