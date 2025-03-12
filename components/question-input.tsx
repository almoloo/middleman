'use client';

import { LoaderPinwheelIcon, SendIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface QuestionInputProps {
	action: (formData: FormData) => Promise<void>;
	loading: boolean;
}

export default function QuestionInput({ action, loading }: QuestionInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				await action(formData);
				if (inputRef.current) {
					inputRef.current.value = '';
					inputRef.current.focus();
				}
			}}
			className="sticky bottom-5 backdrop-blur-xl shadow-2xl flex items-center border border-neutral-400/50 focus-within:border-indigo-400 transition-colors rounded-full mt-5"
		>
			<input
				ref={inputRef}
				type="text"
				name="question"
				placeholder="Type your question…"
				className="grow pl-4 pt-2 pb-2.5 outline-0 disabled:pointer-events-none disabled:text-gray-500"
				maxLength={64}
				disabled={loading}
				required
			/>
			<button
				type="submit"
				className="shrink-0 aspect-square bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition-colors cursor-pointer text-white p-2 rounded-full mr-1 disabled:pointer-events-none disabled:grayscale-100"
				disabled={loading}
			>
				{loading ? (
					<LoaderPinwheelIcon className="w-4 h-4 animate-spin" />
				) : (
					<SendIcon className="w-4 h-4" />
				)}
			</button>
		</form>
	);
}
