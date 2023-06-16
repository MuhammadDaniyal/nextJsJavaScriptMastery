import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database"
import User from "@models/userSchema";

// every nextjs route is something known as serverless route

// handle authentication
const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString()

            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()

                // check if a user already exists
                const userExist = await User.findOne({
                    email: profile.email
                })

                // check if not, create a new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.toLowerCase(),
                        image: profile.picture,
                    })
                }

                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }