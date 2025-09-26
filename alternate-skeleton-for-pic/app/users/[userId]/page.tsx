import { notFound } from "next/navigation"

async function fetchUser(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!res.ok) {
        return null
    }
    const user = await res.json()
    return user
}

export default async function UserPage({
    params,
}: {
    params: Promise<{ userId: string }>
}) {

    const { userId } = await params;
    const user = await fetchUser(userId)

    if (!user) {
        notFound()
    }

    return (
        <div>
            <h3>
                <strong>Name:</strong> {user.name}
            </h3>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Website:</strong> {user.website}
            </p>
            <p>
                <strong>Phone:</strong> {user.phone}
            </p>
            <p>
                <strong>Address:</strong> {user.address.street}, {user.address.city}
            </p>
        </div>
    )
}