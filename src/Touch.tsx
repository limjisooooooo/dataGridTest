import React from 'react';
interface TouchRadiusProps{
    x: number;
    y: number;
    r: number;
}

const TouchRadius = (props:TouchRadiusProps) => {
    return <span className={'touch-Radius'} style={{left:props.x-props.r, top:props.y-props.r, width:props.r*2, height:props.r*2}}></span>
}
const Touch = () => {
    const [touchRadius, setTouchRadius] = React.useState(<></>);
    const onMouseDown = (e:React.MouseEvent) => {        
        setTouchRadius(<TouchRadius x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY} r={((e.target as HTMLButtonElement).offsetWidth ** 2 + (e.target as HTMLButtonElement).offsetHeight ** 2) ** (1/2)}/>);
    }
    const onMouseUp = () => {
        setTimeout(() => {
            setTouchRadius(<></>);
        }, 100);
        
    }   
    return <span className='touch-Root' onMouseDown={(e) => onMouseDown(e)} onMouseUp={() => onMouseUp()}>{touchRadius}</span>
}
export default Touch;