import React from 'react';
import DataGrid, {ColProps} from './DataGrid';
const GridExam = () => {
    const rows = [
        {cmpy:'insu', prod:'p0001', salesCnt:10, salesAmt:100000},
        {cmpy:'insu', prod:'p0001', salesCnt:17, salesAmt:170000},
        {cmpy:'Miy', prod:'p0007', salesCnt:12, salesAmt:240000},
        {cmpy:'insu', prod:'p0002', salesCnt:10, salesAmt:102000},
        {cmpy:'Miy', prod:'p0010', salesCnt:10, salesAmt:300000}];
    const cols: ColProps[] = [
        {value:'cmpy'},
        {value:'prod'},
        {value:'salesCnt', 
        type:{
            element:'select',
            options:['10','11','12','13','14','15','16','17'],
        }
        },
        {value:'salesAmt', 
        }
    ];       
    return( 
        <div>
            <div>Default Grid</div>
            <DataGrid cols={cols} rows={rows} isFolding={false}/>
            <div>Folding Grid</div>
            <DataGrid cols={cols} rows={rows} isFolding={true} group_cols={['cmpy','prod']} sum_cols={['salesCnt','salesAmt']}/>
        </div>
    )
}
export default GridExam;