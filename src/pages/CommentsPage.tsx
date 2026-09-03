import { useState, useMemo, useCallback } from 'react';
import CommentsList from '../components/CommentsList';
import useFetch from '../hooks/useFetch';
import Pagination from '../components/Pagination';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const PAGE_SIZE = 10;

const URL = `https://jsonplaceholder.typicode.com/comments`;

const CommemntsPage = () => {

    const { data, isLoading, error } = useFetch<Comment[]>({ URL, initialData: [] });
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        if(!data) return 0;
        return Math.ceil(data.length / PAGE_SIZE);
    }, [data]);

    const currentComments = useMemo(() => {
        if(!data) return [];
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage]);


    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>{error}</p>;
    }

    if(!data || !data.length) {
        return <p>No comments found</p>;
    }

    return (
        <div>
            <h1>Comments Page</h1>
            <ul>
                {currentComments.map((comment) => (
                    <CommentsList key={comment.id} comment={comment} />
                ))}
            </ul>
            <p>Page {currentPage} of {totalPages}</p>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
        </div>
    );

}

export default CommemntsPage;
