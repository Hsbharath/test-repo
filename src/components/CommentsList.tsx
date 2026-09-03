interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsListProps {
  comment: Comment;
}

const CommentsList = ({ comment}: CommentsListProps) => {
  return (
    <li>
        <strong>{comment.id} - {comment.name}</strong> - {comment.email}
        <p>{comment.body}</p>
    </li>
   );
}

export default CommentsList;
