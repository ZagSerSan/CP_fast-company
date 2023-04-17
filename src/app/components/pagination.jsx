import React from 'react';
import _ from 'lodash';

const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {
  const pageCount = Math.ceil(itemsCount/pageSize) // кол-во страниц
  const pages = _.range(1, pageCount+1) // массив страниц (целое число)
  // не отображать пагинацию если кол-в остраниц равно 1
  if (pageCount === 1) return null

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={"page-item " + (currentPage === page ? 'active' : '')}
            key={'page_'+page} 
            style={{cursor: 'pointer'}}
          >
            <a  className="page-link" onClick={()=>onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
 
export default Pagination;