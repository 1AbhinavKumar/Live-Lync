import {withAuth} from "next-auth/middleware"

// withAuth-It's used to protect routes and redirect unauthenticated users to a specific page (in this case, the sign-in page).

export default withAuth({
    pages : {
        signIn : '/',
    }
})

export const config ={
    matcher : [
        "/users/:path*"
    ]
}

// The matcher field in the exported config defines which routes the middleware should apply to. In this case, the middleware will run for any route that starts with /users/, including nested paths (/users/:path*).