'use client';

import { generateQuestions, updateUserData } from '@/lib/actions';
import { QAObject, UserInfo } from '@/lib/definitions';
import { useState } from 'react';
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

	const generateQuestionsHandler = async () => {
		try {
			const generatedQuestions = await generateQuestions(
				questionThreadId,
				userData?.data,
				userData?.skipped,
				10
			);
			console.log('questions: ', generatedQuestions);
			setQuestions(generatedQuestions?.questions!);
		} catch (error: unknown) {
			console.error(error);
		}
	};

	const goToNextQuestion = () => {
		const newQuestions = questions?.filter((q, i) => i !== 0);
		setQuestions(newQuestions || null);
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
			<p>thread id: {questionThreadId}</p>
			<p>email: {email}</p>
			{answers.length > 0 && <pre>{JSON.stringify(answers)}</pre>}
			<hr />
			{skipped.length > 0 && <pre>{JSON.stringify(skipped)}</pre>}
			<hr />
			{!questions && (
				<button onClick={generateQuestionsHandler}>
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
