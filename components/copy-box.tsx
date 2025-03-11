'use client';

import { encodeEmail } from '@/lib/utils';

export default function CopyBox({ text }: { text: string }) {
	async function handleCopy() {
		await navigator.clipboard.writeText(text);
	}
	return (
		<div className="flex bg-white/50 border border-white rounded p-1 pl-2">
			<input
				readOnly
				value={text}
				className="grow"
			/>
			<button
				className="text-sm font-bold hover:bg-indigo-400/20 active:bg-indigo-400/30 cursor-pointer rounded px-2 py-1"
				onClick={handleCopy}
			>
				Copy
			</button>
		</div>
	);
}
