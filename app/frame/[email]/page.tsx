import OrbAnimation from '@/components/orb-animation';
import Link from 'next/link';
export default async function FramePage({
	params,
}: {
	params: Promise<{ email: string }>;
}) {
	const email = (await params).email;

	return (
		<section className="flex flex-col grow">
			<div className="grid grid-cols-7 mx-auto max-w-[400px] items-center grow">
				<div className="col-span-3">
					<OrbAnimation />
				</div>
				<div className="col-span-4">
					<h2 className="text-lg font-bold mb-1">Ask Me Anything!</h2>
					<p className="text-sm text-balance text-neutral-600">
						Let AI introduce you to me! Press the button to begin.
					</p>
				</div>
			</div>
			<div>
				<Link
					href={`/frame/${email}/chat`}
					className="btn btn-primary w-full"
				>
					Start Chatting
				</Link>
			</div>
		</section>
	);
}
