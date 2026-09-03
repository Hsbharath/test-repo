interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
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
