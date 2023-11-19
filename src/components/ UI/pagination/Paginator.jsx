import React from 'react'
import { getPagesArray } from '../../../utils/pages'

const Paginator = ({totalPages, page, changePage}) => {
    
      let pagesArray = getPagesArray(totalPages)

    return (
        <div>
            <div className='paginator__buttons__display'>
                {pagesArray.map(p =>
                    <button onClick={() => changePage(p)} key={p} className={page === p ? 'page page__current' : 'page'}>{p}</button>
                )}
            </div>
        </div>
    )
}

export default Paginator


