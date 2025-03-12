import { fetchQuestionThread, fetchUserData } from '@/lib/data';
import { auth } from '@/lib/auth';
import React from 'react';
import { generateQuestions } from '@/lib/actions';
import QuestionBox from '@/components/question-box';
import { CircleAlertIcon, CircleHelpIcon, LinkIcon } from 'lucide-react';
import Alert from '@/components/alert';
import { encodeEmail } from '@/lib/utils';
import CopyBox from '@/components/copy-box';

export default async function DashboardPage() {
	const session = await auth();
	const userData = await fetchUserData(session?.user?.email!);
	console.log('data', userData);

	const questionThread = await fetchQuestionThread(session?.user?.email!);
	console.log('q thread', questionThread);

	const updateUserData = async () => {};

	return (
		<div className="flex flex-col gap-2 leading-relaxed">
			<h2 className="font-bold flex items-center gap-2">
				<CircleHelpIcon className="w-5 h-5 text-neutral-500" />
				How This Works
			</h2>
			<p>
				Welcome to Middleman's assistant training process. This page
				will guide you through building your personal AI representative
				for your LUKSO Universal Profile. Here's what you need to know:
			</p>
			<ol className="list-decimal list-inside flex flex-col gap-1">
				<li>
					<strong>Answer the question</strong> - Provide as much
					detail as you feel comfortable sharing. Detailed, thorough
					answers will result in a more knowledgeable assistant that
					can better represent you.
				</li>
				<li>
					<strong>Skip the question</strong> - If you prefer not to
					answer a particular question, you can skip it and move on to
					the next one. Your assistant will simply not have
					information on this topic and will remember not to bring it
					up ever again.
				</li>
			</ol>

			<h2 className="font-bold flex items-center gap-2">
				<CircleAlertIcon className="w-5 h-5 text-neutral-500" />
				Important information about your data:
			</h2>
			<p>
				All answers you provide will be stored publicly on IPFS
				(InterPlanetary File System) and linked to your Universal
				Profile. This means anyone with access to your assistant can
				potentially access this information. Only share what you're
				comfortable making public.
			</p>
			<div>
				<QuestionBox
					questionThreadId={questionThread}
					email={session?.user?.email!}
					userInfo={userData}
				/>
			</div>
		</div>
	);
}
