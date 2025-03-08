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

	// const questions = await generateQuestions();
	// console.log('🎈', questions);

	return (
		<div>
			<h1>DashboardPage</h1>
			{userData && (
				<>
					<h2>User data</h2>
					<pre>{JSON.stringify(userData)}</pre>
				</>
			)}
			<hr />
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
