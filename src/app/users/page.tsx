import ListTemplate from "../components/ListTemplate";
import { renderItem } from "../components/RenderItem";

export interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersList() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  const users = await response.json();

  return (
    <div className="users-list">
      <ListTemplate<User>
        title="User List"
        data={users}
        renderItem={renderItem} 
      />
    </div>
  );
};


