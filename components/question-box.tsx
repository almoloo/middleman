'use client';

import { generateQuestions, updateUserData } from '@/lib/actions';
import { QAObject, UserInfo } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import Question from '@/components/question';
import {
	CheckCheckIcon,
	CloudUploadIcon,
	ListTodoIcon,
	LoaderIcon,
	LoaderPinwheelIcon,
} from 'lucide-react';
import Alert from './alert';

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
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const generateQuestionsHandler = async (
		uData?: QAObject[],
		skData?: string[],
		num?: number,
		push: boolean = false
	) => {
		try {
			setFetchingQ(true);
			setSubmitted(false);
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
			setSubmitting(true);
			const updatedData = await updateUserData(email, data);
			console.log('✅', updatedData);
			setAnswers([]);
			setSkipped([]);
			setQuestions(null);
			setUserData(updatedData.data);
			setSubmitted(true);
		} catch (error: unknown) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<article className="flex flex-col gap-4 border bg-slate-50 border-slate-400/20 rounded-lg p-5">
			<section className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ListTodoIcon className="h-5 w-5" />
					<h3 className="text-sm font-bold">Training Form</h3>
				</div>
				{questions && (
					<div className="flex flex-col items-end text-xs text-neutral-500">
						{/* <span>{userData?.data.length} answers synced</span> */}
						<span
							className={`${
								answers.length > 0 && 'text-emerald-400'
							}`}
						>
							{answers.length} answer
							{answers.length === 1 ? '' : 's'} to sync
						</span>
						<span
							className={`${
								skipped.length > 0 && 'text-emerald-400'
							}`}
						>
							{skipped.length} skipped to sync
						</span>
					</div>
				)}
			</section>
			{!questions && !submitting && (
				<section className="flex flex-col gap-3">
					<p className="text-sm">
						Click the button below to generate your questions. You
						can answer as many questions as you like - the more you
						answer, the better your assistant will understand you.
					</p>
					{submitted && (
						<Alert
							title="Upload Successful"
							description="All your answers have been successfully uploaded to IPFS and your personal AI assistant has been trained."
							variant="success"
							icon={<CheckCheckIcon className="alert-icon" />}
						/>
					)}
					<button
						className="btn btn-primary w-full relative"
						onClick={() => generateQuestionsHandler()}
						disabled={fetchingQ}
					>
						{fetchingQ && (
							<div className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
								<LoaderPinwheelIcon className="btn-icon animate-spin" />
							</div>
						)}
						<span className={fetchingQ ? 'invisible' : ''}>
							Generate {submitted && 'More'} Questions
						</span>
					</button>
				</section>
			)}
			{questions && questions.length > 0 && !submitting && (
				<section className="flex flex-col gap-1">
					<h3 className="text-sm font-bold text-neutral-500">
						Question {answers.length + skipped.length + 1}
					</h3>
					<Question
						question={questions[0]}
						addAnswer={addAnswer}
						skipQuestion={skipQuestion}
					/>
					<div className="mt-3">
						<p className="text-sm text-neutral-500">
							Once you submit, your answers will be securely
							stored on IPFS and linked to your Universal Profile.
							You can always update your assistant later.
						</p>
						<div className="flex justify-end">
							<button
								className="btn btn-success"
								onClick={handleSubmitAnswers}
								disabled={submitting}
							>
								{submitting ? (
									<LoaderPinwheelIcon className="btn-icon animate-spin" />
								) : (
									<CloudUploadIcon className="btn-icon" />
								)}
								Submit Answers
							</button>
						</div>
					</div>
				</section>
			)}
			{questions && questions.length === 0 && fetchingQ && (
				<section className="flex items-center justify-center text-neutral-500 gap-3">
					<LoaderPinwheelIcon className="w-5 h-5 animate-spin" />
					<p className="text-sm font-bold">
						Generating more questions for you...
					</p>
				</section>
			)}
			{submitting && (
				<section className="flex justify-center items-center gap-3 py-10">
					<LoaderIcon className="h-6 w-6 animate-spin" />
					<p className="text-sm">
						Please wait while your answers are being uploaded to
						IPFS.
					</p>
				</section>
			)}
		</article>
	);
}
