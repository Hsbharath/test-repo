import type { User } from '../context/UserContext';

interface UserListProps {
  userList: User[];
}

const UserList = ({ userList }: UserListProps) => {
  return (
    <ul>
      {Array.isArray(userList) &&
        userList.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

export default UserList;
