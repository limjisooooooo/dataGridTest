import React from 'react';
import Button from './Button';
import Select from './Select';
import { ListItem } from './List';
import './DataGrid.css';

interface ColProps{
    value:any;
    type?:Coltype;
    isFoldingCol?:boolean;
    folding?:boolean;
    setHidden?(isHidden: boolean):void;
}
interface Coltype{
    element: 'input'|'select'|'button'|'textArea'|'img';
    type?:'text'|'password'|'checkbox'|'radio'|'hidden'|'email'|'tel'|'url'|'date';
    options?: (string|number|{text:string|number, value:string|number})[];
    onClick?(e?:React.MouseEvent):void;
}
const InputType = (value: any, type?:Coltype) => {    
    if(!type){
        return value;
    }
    switch(type.element){
        case 'input':            
            return <input type={type.type} defaultValue={value} onClick={type.onClick}/>                        
        case 'select':
            return(                
                <Select style={{flex:1}} onClick={type.onClick} placeholder={''}>
                    {
                        type.options?.map((option, idx) => (                            
                            typeof(option) == 'object'?<ListItem key={idx} value={option.value?option.value:option.text}>{option.text?option.text:option.value}</ListItem>:<ListItem key={idx} value={option}>{option}</ListItem>       
                        ))
                    }                    
                </Select>                                               
                         
            )
        case 'button':
            return (
                <>
                    {value}
                    <div>                    
                        {type.options?.map((option, idx) => (
                            typeof(option) != 'object'?<Button key={idx} onClick={type.onClick}>{option}</Button>:<></>
                            ))
                        }
                    </div>
                </>
            )
        case 'textArea':
            return;
    }    
}

const Col = (props:ColProps) => {
    const [Folding, setFolding] = React.useState("");    
    const onClick = () => {
        if (!Folding){
            setFolding(" clicked");
            props.setHidden!(false);
        }else{
            setFolding("");
            props.setHidden!(true);
        }
    }    
    React.useEffect(()=> {
        if(props.folding==true){
            setFolding("");
        }
    },[props.folding])
    return (
        props.isFoldingCol?<div className='col Folding-col' onClick={() => onClick()}><span className={'Folding' + Folding}></span>{props.value}</div>:
            <div className='col'>{InputType(props.value, props.type)}</div>
    )
    //return <div className='col'>{props.value}</div>
}
export {Col as default, Col};
export type {Coltype};