import { redirect } from "next/navigation";

export default function RegisterPage() {

    const registerUser = async (formData: FormData) => {
        "use server"
        
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const tel = formData.get("tel") as string;
        const role = formData.get("role") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !tel || !role || !password) {
            console.error("Missing required fields");
            return;
        }

        try {
            const response = await fetch(`${process.env.API_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    tel,
                    role,
                    password
                })
            });

            if (!response.ok) {
                console.error("Registration failed");
                return; 
            }

        } catch (error) {
            console.log(error);
            return;
        }
        redirect("/api/auth/signin");
    }

    return (
        <main className="w-full flex flex-col items-center space-y-4 p-10">
            <h1 className="text-2xl font-semibold">Register New User</h1>
            
            <form action={registerUser} className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
                
                <div className="mb-4">
                    <label className="block text-gray-700 pr-4 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input type="text" required id="name" name="name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 pr-4 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input type="email" required id="email" name="email"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 pr-4 mb-1" htmlFor="tel">
                        Telephone
                    </label>
                    <input type="tel" required id="tel" name="tel"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 pr-4 mb-1" htmlFor="role">
                        Role
                    </label>
                    <select required id="role" name="role" defaultValue="member"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400">
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 pr-4 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input type="password" required id="password" name="password"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 
                        text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </main>
    );
}