import React from 'react'
function Pagination(props){
    const pageNumber =[];
    for(let i=1; i<=Math.ceil( props.totalItems/props.itemsPerPage);i++){
        pageNumber.push(i);
    }
    return(
        <div className="pagination pagination-sm justify-content-end border-0">
            {pageNumber.map(Number=>{
                return(
                    <li className="page-item">
                        <a onClick={()=>props.pageSelect(Number)} href="#" className="page-link">
                            {Number}
                            
                        </a>
                    </li>
                )
            })}

        </div>
    )
}
export default Pagination


