const UserList = ({ userList }) => {
  return (
    <ul>
      {Array.isArray(userList) &&
        userList.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

export default UserList;
