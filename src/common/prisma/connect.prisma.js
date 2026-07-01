import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.ts";
import { DATABASE_URL } from "../constant/app.constant.js";

const url = new URL(DATABASE_URL)
console.log(process.env.DATABASE_URL)

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port), // port của db online(railway)
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export { prisma };