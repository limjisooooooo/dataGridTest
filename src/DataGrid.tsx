import React from 'react';
import {Col,Coltype} from './Col';
import {Rows, FoldingRows, RowsProps, ColProps} from './Rows';
import './DataGrid.css';

interface DataGridProps extends RowsProps{
    isFolding?: boolean;
    group_cols?: (string|number)[];    
    sum_cols?: (string|number)[];    
}

const DataHeader = (props: {'cols': ColProps[]}) => {
    return (
        <div className='header'>
            {
                props.cols.map((col, idx) => (
                    <Col key={idx} value={col.value}></Col>
                ))                
            }            
        </div>
    )
}

interface DataFooterProps {
    count: number;
}
const DataFooter = (props:DataFooterProps) => {
    return(
        <div className='footer'>Record Count : {props.count}</div>
    )
}
const DataGrid = (props:DataGridProps) => {
    const [cols, setCols] = React.useState(props.cols);
    const [isFolding, setIsFolding] = React.useState(props.isFolding);
    const rowsSort = (a:{[key:string|number]:any}, b:{[key:string|number]:any}) => {
        for (let i = 0; i<props.cols.length; i++){
            if (a[props.cols[i].value]>b[props.cols[i].value]){
                return 1;
            }
            if (a[props.cols[i].value]<b[props.cols[i].value]){
                return -1
            }
        }
        return 0;
    }       
    React.useEffect(() => {
        props.rows.sort(rowsSort);
        if(isFolding){
            if(props.group_cols && props.group_cols.length < cols.length){                
                const newCols:ColProps[] = [...cols.filter(col => (props.group_cols!.includes(col.value))), ...cols.filter(col => !(props.group_cols!.includes(col.value)))];
                setCols(newCols);                
            }
        }
    },[props.rows])
    return(
        <div className='DataGrid'>
            <DataHeader cols={cols}/>
            {
                isFolding?<FoldingRows cols={cols} rows = {props.rows} group_cnt={props.group_cols && props.group_cols.length < cols.length? props.group_cols.length:cols.length-1} sum_cols={props.sum_cols}/>:<Rows cols={cols} rows = {props.rows}/>
            }                        
            <DataFooter count={props.rows.length}/>
        </div>
    )
}
export default DataGrid;
export type {ColProps, Coltype};