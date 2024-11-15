import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isProduction = process.env.NODE_ENV === "production";
  console.log("isProduction", isProduction);
  res.setHeader("Set-Cookie", [
    `token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax;${
      isProduction ? " Secure;" : ""
    }`,
  ]);

  res.status(200).json({ message: "Logged out" });
}
