export default async function Contact() {
    console.log("Hi this is in the server or client?");

    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    console.log(data);

    return (
        <div>Contact page</div>
    )
}