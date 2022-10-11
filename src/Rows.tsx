import React from 'react';
import {Col,Coltype} from './Col';

interface ColProps{
    value: string|number;
    type?: Coltype;
}
interface RowsProps{
    cols: ColProps[];
    rows: {[key:string|number]:any}[]; 
}
interface FoldingRowsProps extends RowsProps{
    group_cnt: number;
    sum_cols?: (string|number)[];    
}
interface GroupRowProps{
    [key:string|number]:any;
    next_node:GroupRowProps[];
    item_count:number;
}
interface FoldingRowProps{
    row: {[key:string|number]:any};
    cols: ColProps[];
    depth: number;
    group_cnt: number;
    item_count:number;
    hidden?: boolean;
}
const Rows = (props:RowsProps) => {
    const [rows, setRows] = React.useState<{[key:string|number]:any}[]>([]);     
    React.useEffect(()=> {                        
        setRows(props.rows);        
    }, [props.rows]);    
    return(
        <>
        {
            rows.map((row, rowidx)=> (
                <div key={rowidx} className={'row'} accessKey={rowidx.toString()}>
                {
                    props.cols.map((col, colidx) => (
                        <Col key={colidx} value={row[col.value]} type={col.type}/>
                    ))
                }   
            </div>           
            ))
        }
        </>
    )
}

const FoldingRows = (props:FoldingRowsProps) => {
    const [groupRows, setGroupRows] = React.useState<GroupRowProps[]>([]);  
    const makeGroupRows = (rows:{[key:string|number]:any}[], cols:ColProps[], group_cnt:number, sum_cols?: (string|number)[]) => {
        const makeNode = (parent:GroupRowProps[], row:{[key:string|number]:any}, cols:ColProps[], group_cnt:number, idx:number, sum_cols?: (string|number)[]) => {
            if(group_cnt>idx){
                for(let i = 0; i < parent.length; i++) {
                    if (parent[i][cols[idx].value] == row[cols[idx].value]){
                        parent[i].item_count += 1;
                        sum_cols?.map((col, colidx) => {
                            if(cols[idx].value != col){
                                if(parent[i][col]){
                                    parent[i][col] += row[col];
                                }else{
                                    parent[i][col] = row[col];
                                }
                            }
                        })                        
                        if(idx==cols.length-1){
                            break;
                        }                        
                        makeNode(parent[i].next_node, row, cols, group_cnt, idx+1, props.sum_cols);
                        return;
                    }
                }
                let node: GroupRowProps = {next_node:[], item_count:1};
                node[cols[idx].value] = row[cols[idx].value];
                sum_cols?.map((col, colidx) => {
                    if(cols[idx].value != col){
                        if(node[col]){
                            node[col] += row[col];
                        }else{
                            node[col] = row[col];
                        }
                    }
                })
                parent.push(node);
                if(idx==cols.length-1){
                    return;
                }                
                makeNode(node.next_node, row, cols, group_cnt, idx+1, props.sum_cols);
            }
            else{
                let node:GroupRowProps = {next_node:[], item_count:1};
                for(let i=idx; i<cols.length; i++){
                    node[cols[i].value] = row[cols[i].value]    
                }
                parent.push(node);
                return;
            }
        }
        let node:GroupRowProps[] = [];
        rows.map((row) => {
            makeNode(node, row, cols, group_cnt, 0, props.sum_cols);
        })                
        return node;
    }
    React.useEffect(()=> {        
        setGroupRows(makeGroupRows(props.rows, props.cols, props.group_cnt));                  
    }, [props.rows]);     
    return(
        <>
        {
            groupRows.map((row, rowidx)=> (
                <FoldingRow key={rowidx} row={row} cols={props.cols} depth={0} hidden={false} group_cnt={props.group_cnt} item_count={row.item_count}/>                
            ))
        }
        </>
    )    
}
const FoldingRow = (props:FoldingRowProps) => {
    const [hidden, setHidden]=React.useState(true);    

    React.useEffect(() => {
        if(props.hidden! == true)
            setHidden(true);
    },[props.hidden])
    return(
        <>
            <div>
                <div className={props.hidden==true?'row hidden':'row'}>
                    {
                        props.cols.map((col, colidx) => (
                            <Col key={colidx} value={colidx==props.depth?props.row[col.value]:(hidden?(props.row[col.value]?props.row[col.value]:(colidx==props.depth+1?"Count : "+props.item_count:"")):"")} isFoldingCol={colidx < props.group_cnt && colidx==props.depth?true:false} setHidden={setHidden} folding={props.hidden}/>                            
                        ))
                    }   
                </div>
                {                    
                    props.row.next_node.map((row:GroupRowProps, rowidx:number) => (
                        <FoldingRow key={rowidx} row={row} cols={props.cols} depth={props.depth+1} hidden={hidden} group_cnt={props.group_cnt} item_count={row.item_count}/>
                    ))
                }
            </div>
        </>
    )
}
export { Rows as default, Rows, FoldingRows };
export type { ColProps, RowsProps };
