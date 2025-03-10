'use client';

import { generateQuestions, updateUserData } from '@/lib/actions';
import { QAObject, UserInfo } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import Question from '@/components/question';

interface QuestionBoxProps {
	questionThreadId: string;
	email: string;
	userInfo: UserInfo | null;
}

export default function QuestionBox({
	questionThreadId,
	email,
	userInfo,
}: QuestionBoxProps) {
	const [userData, setUserData] = useState<UserInfo | null>(userInfo);
	const [questions, setQuestions] = useState<string[] | null>(null);
	const [answers, setAnswers] = useState<QAObject[]>([]);
	const [skipped, setSkipped] = useState<string[]>([]);
	const [fetchingQ, setFetchingQ] = useState(false);

	const generateQuestionsHandler = async (
		uData?: QAObject[],
		skData?: string[],
		num?: number,
		push: boolean = false
	) => {
		try {
			setFetchingQ(true);
			const generatedQuestions = await generateQuestions(
				questionThreadId,
				uData ?? userData?.data,
				skData ?? userData?.skipped,
				num ?? 10
			);
			console.log('questions: ', generatedQuestions);
			if (push) {
				setQuestions((prev) => [
					...(prev ?? []),
					...generatedQuestions?.questions!,
				]);
			} else {
				setQuestions(generatedQuestions?.questions!);
			}
		} catch (error: unknown) {
			console.error(error);
		} finally {
			setFetchingQ(false);
		}
	};

	const goToNextQuestion = async () => {
		const newQuestions = questions?.filter((q, i) => i !== 0);
		setQuestions(newQuestions || null);
		// 	RETRIEVE 10 MORE QUESTION
		if (!questions || questions.length <= 3) {
			const modifiedUserData = [...(userData?.data ?? []), ...answers];
			const modifiedSkipped = [...(userData?.skipped ?? []), ...skipped];
			const fetchedQuestions = await generateQuestionsHandler(
				modifiedUserData,
				modifiedSkipped,
				10,
				true
			);
		}
	};

	const addAnswer = (item: QAObject) => {
		setAnswers((prev) => [...prev, item]);
		goToNextQuestion();
	};

	const skipQuestion = (question: string) => {
		setSkipped((prev) => [...prev, question]);
		goToNextQuestion();
	};

	const handleSubmitAnswers = async () => {
		const data: UserInfo = {
			data: answers,
			skipped,
		};

		try {
			const updatedData = await updateUserData(email, data);
			console.log('✅', updatedData);
			setAnswers([]);
			setSkipped([]);
			setQuestions(null);
			setUserData(updatedData.data);
		} catch (error: unknown) {
			console.error(error);
		}
	};
	return (
		<div>
			<p>Answer some questions</p>
			{!questions && (
				<button onClick={() => generateQuestionsHandler()}>
					Generate questions
				</button>
			)}
			{questions && questions.length > 0 && (
				<>
					<h1>Question:</h1>
					<Question
						question={questions[0]}
						addAnswer={addAnswer}
						skipQuestion={skipQuestion}
					/>
					<button onClick={handleSubmitAnswers}>
						Submit answers
					</button>
				</>
			)}
		</div>
	);
}
