import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("studio-space");
const frontendUrl = (
  process.env.BETTER_AUTH_URL || "http://localhost:3000"
).trim().replace(/\/+$/, "");

export const auth = betterAuth({
  baseURL: frontendUrl,
  trustedOrigins: [frontendUrl],
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    jwt({
      sessionCookieCache: true,
      jwt: {
        issuer: frontendUrl,
        audience: frontendUrl,
      },
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7,
    },
  },
});
