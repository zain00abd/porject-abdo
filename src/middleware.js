export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/alldata", "/storage/formsetdata", "/storage", "/wallet"] }