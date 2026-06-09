import type { Request, Response, NextFunction } from "express";

export function convertBigIntToNumber(obj: any): any {
	if (obj === null || obj === undefined) {
		return obj;
	}

	if (typeof obj === "bigint") {
		return Number(obj);
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => convertBigIntToNumber(item));
	}

	if (typeof obj === "object") {
		const converted: any = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				converted[key] = convertBigIntToNumber(obj[key]);
			}
		}
		return converted;
	}

	return obj;
}
export function bigIntMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const originalJson = res.json.bind(res);

	res.json = function (body: any) {
		try {
			// Convert BigInts before sending
			if (body !== undefined) {
				body = convertBigIntToNumber(body);
			}
			// Call original json method
			return originalJson.call(this, body);
		} catch (error) {
			return originalJson.call(this, body);
		}
	};

	if (res.locals.data !== undefined) {
		res.locals.data = convertBigIntToNumber(res.locals.data);
	}

	next();
}
