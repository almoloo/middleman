export function encodeEmail(email: string) {
	return Buffer.from(email)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export function decodeEmail(encoded: string) {
	const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
	return Buffer.from(base64, 'base64').toString('utf-8');
}
