import React from 'react'

const Pagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <div>
        {Array.from({ length: totalPages }, (_, index) => ( 
            <button key={index} disabled={currentPage === index + 1} onClick={() => onChange(index + 1)}>
                {index + 1}
            </button>
        ))}
    </div>
  )
}

export default Pagination;
