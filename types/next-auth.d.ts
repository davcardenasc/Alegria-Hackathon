import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "REVIEWER" | "ADMINISTRATOR"
    } & DefaultSession["user"]
  }

  interface User {
    role: "REVIEWER" | "ADMINISTRATOR"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "REVIEWER" | "ADMINISTRATOR"
  }
}