import { fetchQuestionThread, fetchUserData } from '@/lib/data';
import { auth } from '@/lib/auth';
import React from 'react';
import { generateQuestions } from '@/lib/actions';
import QuestionBox from '@/components/question-box';

export default async function DashboardPage() {
	const session = await auth();
	const userData = await fetchUserData(session?.user?.email!);
	console.log('data', userData);

	const questionThread = await fetchQuestionThread(session?.user?.email!);
	console.log('q thread', questionThread);

	const updateUserData = async () => {};

	return (
		<div>
			<h1>Answer questions about yourself to train your AI assistant</h1>
			<h2 className="text-sm font-bold">How This Works</h2>
			<p>
				You'll be presented with questions one at a time. You can either
				answer or skip each question. All answered questions will help
				train your personal AI assistant to represent you better on your
				LUKSO Grid.
			</p>
			<small>
				The more questions you answer about yourself the better your
				assistant will be able to represent you.
			</small>
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
