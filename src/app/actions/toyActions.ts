"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Create Toy
export async function addToy(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') return;

    const name = formData.get("name");
    const description = formData.get("desc");
    const posterPicture = formData.get("posterPicture");
    const arrivalDateString = formData.get("arrivalDate") as string;
    const availableQuota = formData.get("availableQuota");
    const sku = formData.get("sku");

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/arttoys`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                name,
                description,
                posterPicture,
                arrivalDate: arrivalDateString,
                availableQuota: Number(availableQuota),
                sku
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create toy");
        }

    } catch (error) {
        console.log(error);
        throw error; 
    }

    revalidateTag("toys"); // clear cache
    redirect("/adminMenu/manage");
}

// Update Toy
export async function updateToy(toyId: string, formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') return;

    const name = formData.get("name");
    const description = formData.get("desc");
    const posterPicture = formData.get("posterPicture");
    const arrivalDateString = formData.get("arrivalDate") as string;
    const availableQuota = formData.get("availableQuota");
    const sku = formData.get("sku");

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/arttoys/${toyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                name,
                description,
                posterPicture,
                arrivalDate: arrivalDateString,
                availableQuota: Number(availableQuota),
                sku
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update toy");
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

    revalidateTag("toys");
    redirect("/adminMenu/manage");
}

// Delete Toy
export async function deleteToy(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') return;

    const toyId = formData.get("toyId");

    try {
        const response = await fetch(`${process.env.API_URL}/api/v1/arttoys/${toyId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${session.user.token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete toy");
        }
    } catch (error) {
        console.log(error);
    }

    revalidateTag("toys");
}