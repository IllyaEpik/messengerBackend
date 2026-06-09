import jwt from "jsonwebtoken";
// import { AuthenticationError } from "../errors";
import { env } from "../config/env.ts";
import { Socket } from "socket.io";

interface TokenPayload {
	userId: number;
}

export function authSocketMiddleware(
	socket: Socket,
	next: (err?: Error) => void,
) {
	try {
		const authenticate =
			socket.handshake.auth.token || socket.handshake.headers.token;

		if (!authenticate || !authenticate.startsWith("Bearer ")) {
			socket.data.error = "Authorization header missing or invalid";
			// new AuthenticationError("Authorization header missing or invalid")
			next();
			return;
		}

		const token = authenticate.split(" ")[1];

		if (!token) {
			socket.data.error = "Token is missing in the header";
			next();
			// next(new AuthenticationError("Token is missing in the header"));
			return;
		}

		const { userId } = jwt.verify(token, env.SECRET_KEY) as TokenPayload;
		socket.data.userId = userId;

		next();
	} catch (err) {
		console.error("Authentication error:", err);
		next();
		// next(new AuthenticationError("Invalid or expired token"));
	}
}
