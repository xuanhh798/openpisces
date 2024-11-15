import { NextResponse } from "next/server";
import nacl from "tweetnacl";
import bs58 from "bs58";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const { public_key, signature, wallet_type } = await request.json();

    let verified = false;

    if (wallet_type === "metamask") {
      // Verify Ethereum signature
      const message = `Sign in to OpenPisces: ${public_key}`;
      const recoveredAddress = ethers.verifyMessage(message, signature);
      verified = recoveredAddress.toLowerCase() === public_key.toLowerCase();
    } else {
      // Solana verification logic
      const message = `Sign in to OpenPisces: ${public_key}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signatureUint8 = bs58.decode(signature);
      const publicKeyUint8 = bs58.decode(public_key);
      verified = nacl.sign.detached.verify(
        encodedMessage,
        signatureUint8,
        publicKeyUint8
      );
    }

    if (verified) {
      // Generate JWT token
      const token = jwt.sign(
        {
          publicKey: public_key,
          walletType: wallet_type || "solana",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
        },
        JWT_SECRET
      );

      const response = NextResponse.json(
        {
          success: true,
          message: "Wallet verified successfully",
        },
        { status: 200 }
      );

      // Set the JWT token as an HTTP-only cookie
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: true, // Only use HTTPS in production
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid signature",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying wallet:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error verifying wallet",
      },
      { status: 500 }
    );
  }
}
