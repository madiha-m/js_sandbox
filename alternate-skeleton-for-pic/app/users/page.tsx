export default async function Users() {

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()

    return (
        <div>
            <h3>Users List</h3>
            <ul>
                {users.map((user: { id: number; name: string }) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}