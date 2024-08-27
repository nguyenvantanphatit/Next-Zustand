'use client'

import { useUserStore } from '@/lib/store'
export default function User() {
  const addUser = useUserStore(state => state.addUser);
  const users = useUserStore(state => state.users);
  const handleAddUser = () => {
    addUser('John Doe', 'john@example.com');
  };

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      <div>
        <h2>Danh Sách Người Dùng</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
        <h2>Người Dùng Hiện Tại</h2>
        <div></div>
      </div>
    </div>
  );
}
