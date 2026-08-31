const CommentsList = ({ comment}) => {
  return (
    <li>
        <strong>{comment.id} - {comment.name}</strong> - {comment.email}
        <p>{comment.body}</p>
    </li>
   );
}

export default CommentsList;