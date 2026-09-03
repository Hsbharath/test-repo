import { useState, useMemo, useCallback, type ChangeEvent } from 'react';
import UserList from '../components/UserList';
import { useUsers, type User } from '../context/UserContext';

function UsersPage() {
  const { users, isLoading, error } = useUsers();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [users, search]);

  const groupedUsers = useMemo(() => {
    return filteredUsers.reduce<Record<string, User[]>>((acc, value) => {
      const country = value.country;
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(value);
      return acc;
    }, {});
  }, [filteredUsers]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  if (isLoading) {
    return <p> Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if(!users.length) {
    return <p>No users found</p>;
  }

  return (
    <section id="center">
      <input type="text" value={search} onChange={handleChange} />
      <div>
        {Object.entries(groupedUsers).map(([key, value]) => (
          <div key={key}>
            <h3>{key}</h3>
            <UserList userList={value} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsersPage;
