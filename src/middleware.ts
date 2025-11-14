//config how to detect user request
export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/orders/manage"]
}