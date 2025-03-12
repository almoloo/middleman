import ChatBox from '@/components/chat-box';
import { createChatThread } from '@/lib/actions';
import { decodeEmail } from '@/lib/utils';

export default async function ChatPage({
	params,
}: {
	params: Promise<{ email: string }>;
}) {
	const email = (await params).email;
	const parsedEmail = decodeEmail(email);
	const threadId = await createChatThread(parsedEmail);

	return (
		<section className="flex flex-col grow mt-5">
			{threadId ? (
				<ChatBox threadId={threadId!} />
			) : (
				<p className="text-rose-500 m-auto">An error has occured!</p>
			)}
		</section>
	);
}
