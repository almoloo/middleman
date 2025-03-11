import TextBubble from '@/components/text-bubble';
import { decodeEmail } from '@/lib/utils';
import { SendIcon } from 'lucide-react';

export default async function ChatPage({
	params,
}: {
	params: Promise<{ email: string }>;
}) {
	const email = (await params).email;
	const parsedEmail = decodeEmail(email);

	return (
		<section className="flex flex-col grow mt-5">
			<div className="flex flex-col gap-5 grow justify-center overflow-auto">
				<TextBubble
					text="hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello "
					type="request"
				/>
				<TextBubble
					text="hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you? hi, how can I help you?"
					type="response"
				/>
			</div>
			<form
				action=""
				className="sticky bottom-5 backdrop-blur-xl shadow-2xl flex items-center border border-neutral-400/50 focus-within:border-indigo-400 transition-colors rounded-full mt-5"
			>
				<input
					type="text"
					placeholder="Type your question…"
					className="grow pl-4 pt-2 pb-2.5 outline-0"
					maxLength={64}
					required
				/>
				<button
					type="submit"
					className="shrink-0 aspect-square bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition-colors cursor-pointer text-white p-2 rounded-full mr-1"
				>
					<SendIcon className="w-4 h-4" />
				</button>
			</form>
		</section>
	);
}
