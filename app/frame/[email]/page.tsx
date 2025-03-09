import React from 'react';

export default async function FramePage({
	params,
}: {
	params: Promise<{ email: string }>;
}) {
	const email = (await params).email;
	const parsedEmail = email.replace('--at--', '@').replace('--dot--', '.');
	return <div>FramePage {parsedEmail}</div>;
}
