import React from 'react';
import List from './List';
import './Base.css';
interface SelectProps extends React.HTMLAttributes<Element>{
}
const Select = (props:SelectProps) => {      
    const downIcon = React.useRef(<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill='#696969'><path d="m12 15-5-5h10Z"/></svg>);
    
    const upIcon = React.useRef(<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill='#696969'><path d="m7 14 5-5 5 5Z"/></svg>);
    const [icon, setIcon] = React.useState(downIcon.current);
    const [list, setList] = React.useState(<></>)
    const [value, setValue] = React.useState<string|number|undefined|null>("");
    const [text, setText] = React.useState<string|number|undefined|null>("");    

    const onItemSelect = (e:React.MouseEvent) => {        
        setText((e.currentTarget as HTMLDivElement).textContent);
        setValue((e.currentTarget.lastChild as HTMLInputElement).value);               
    }
    const onClick = (e:React.MouseEvent) => {        
        if(icon == downIcon.current){
            setList(<List style={{left:-1, top:(e.currentTarget as HTMLDivElement).clientHeight, right:-1, position:'absolute'}}>{ListItem()}</List>);
            setIcon(upIcon.current);
            (e.target as HTMLDivElement).focus();
        }else{
            setList(<></>);
            setIcon(downIcon.current);
        }
        if(props.onClick)
            props.onClick(e);
    }    
    const onBlur = (e:React.FocusEvent) => {        
        setList(<></>);
        setIcon(downIcon.current);
    }    
    const ListItem = () => {
        return React.Children.map(props.children, (child, idx) => {
            return React.cloneElement(child as React.ReactElement, {onMouseDown: onItemSelect, key:idx});
        })
    }
    return (            
        <div className={'select' + (text == ""? "": ' textIn')} onClick={(e) => onClick(e)} onBlur={(e) => onBlur(e)} tabIndex={0} style={props.style}>                        
            <label>{props.placeholder}</label>
            <div className='select_Box_inner'>                
                <div className='select_Text'>
                    <div style={{display:'table-cell', verticalAlign:'middle'}} >
                        {text}
                    </div>
                </div>
                {icon}
            </div>                                        
            {list}
            <input type={'hidden'} value={value?value:""}/>
        </div>
        
    );
}
export default Select;