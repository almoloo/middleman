import ConnectButton from '@/components/connect-button';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
import Link from 'next/link';
import SendAnimation from '@/components/send-animation';
import {
	BrushIcon,
	FrameIcon,
	GlassesIcon,
	MegaphoneIcon,
	MessageCircleQuestionIcon,
	MessagesSquareIcon,
	ShieldUserIcon,
} from 'lucide-react';
import Footer from '@/components/footer';

const howItWorks = [
	{
		title: 'Answer AI-Generated Questions',
		text: "Our system creates personalized questions about you. Answer what you're comfortable sharing, skip what you're not.",
		image: <MessageCircleQuestionIcon className="w-14 h-14" />,
	},
	{
		title: 'Securely Store Your Data',
		text: 'Your responses are stored on IPFS—a decentralized storage network—not on our servers. Only a reference is stored on your Lukso profile.',
		image: <ShieldUserIcon className="w-14 h-14" />,
	},
	{
		title: 'Embed The Widget',
		text: 'Add the Middleman widget to your Universal profile grid and pick the size.',
		image: <FrameIcon className="w-14 h-14" />,
	},
	{
		title: 'Let Visitors Connect With You',
		text: "Visitors can now ask questions about you, and our AI will respond based only on the information you've chosen to share.",
		image: <MessagesSquareIcon className="w-14 h-14" />,
	},
];

const whyChoose = [
	{
		title: 'Decentralized Data Storage',
		text: 'Your information lives on IPFS, not on centralized servers. You own your data.',
	},
	{
		title: 'AI-Powered Interactions',
		text: "Leveraging OpenAI's technology to create natural, accurate responses about you.",
	},
	{
		title: 'Privacy Focused',
		text: 'Share only what you want. Skip questions freely. Your privacy is paramount.',
	},
	{
		title: 'Seamless Integration',
		text: 'Works natively with Lukso Universal Profiles with minimal setup required.',
	},
];

const useCase = [
	{
		title: 'Creators & Influencers',
		text: 'Let your followers learn more about you without overwhelming your DMs.',
		image: <BrushIcon className="w-14 h-14" />,
	},
	{
		title: 'Professionals',
		text: 'Create an interactive resume that answers questions about your skills and experience.',
		image: <GlassesIcon className="w-14 h-14" />,
	},
	{
		title: 'Community Leaders',
		text: 'Help community members get to know you and your vision.',
		image: <MegaphoneIcon className="w-14 h-14" />,
	},
];

function GuideItem(props: {
	className?: string;
	title: string;
	text: string;
	image?: React.ReactNode;
}) {
	return (
		<div className={`flex flex-col gap-2 text-center ${props.className}`}>
			{props.image && (
				<div className="flex justify-center mb-4 text-indigo-500">
					{props.image}
				</div>
			)}
			<h3 className="text-lg font-medium">{props.title}</h3>
			<p className="text-sm leading-relaxed text-balance">{props.text}</p>
		</div>
	);
}

function Title(props: { title: string }) {
	return (
		<h2 className="flex gap-5 text-2xl font-semibold text-center mb-10">
			<div className="grow bg-gradient-to-l from-0% from-indigo-500/10 to-transparent border-r-4 border-r-indigo-500/50"></div>
			{props.title}
			<div className="grow bg-gradient-to-r from-0% from-indigo-500/10 to-transparent border-l-4 border-l-indigo-500/50"></div>
		</h2>
	);
}

export default function Home() {
	return (
		<article className="flex flex-col max-w-[920px] mx-auto p-5 gap-15">
			<header className="flex justify-center mt-10">
				<Link href="/">
					<Image
						src={Logo}
						alt="middleman logo"
						className="h-5 w-auto drop-shadow-sm cursor-pointer"
						priority
					/>
				</Link>
			</header>
			{/* Hero */}
			<section className="bg-gradient-to-t md:bg-gradient-to-r from-35% from-indigo-400 to-rose-300 text-white p-10 rounded-3xl">
				<div className="flex flex-col-reverse items-center lg:grid lg:grid-cols-3">
					<div className="lg:col-span-2 flex flex-col gap-3 lg:pl-10">
						<h2 className="text-3xl font-black text-balance">
							Connect with Your Audience Through AI-Powered
							Profiles
						</h2>
						<p className="font-medium">
							Turn your Universal Profile into an interactive
							experience where visitors can learn about you
							through a personalized AI assistant
						</p>
						<div className="mt-5">
							<ConnectButton />
						</div>
					</div>
					<div className="lg:col-span-1">
						<SendAnimation />
					</div>
				</div>
			</section>
			{/* How it works */}
			<section>
				<Title title="The Middleman Process" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-20">
					{howItWorks.map((item, index) => (
						<GuideItem
							title={item.title}
							text={item.text}
							image={item.image}
							key={index}
						/>
					))}
				</div>
			</section>
			{/* Features */}
			<section>
				<Title title="Why Choose Middleman" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-15">
					{whyChoose.map((item, index) => (
						<GuideItem
							title={item.title}
							text={item.text}
							key={index}
						/>
					))}
				</div>
			</section>
			{/* Use Case */}
			<section>
				<Title title="Who Uses Middleman" />
				<div className="grid grid-cols-2 md:grid-cols-3 md:divide-x md:divide-dashed md:divide-neutral-500/50">
					{useCase.map((item, index) => (
						<GuideItem
							title={item.title}
							text={item.text}
							image={item.image}
							key={index}
							className="px-4 py-5"
						/>
					))}
				</div>
			</section>
			{/* Call To Action */}
			<section className="flex flex-col md:flex-row md:items-center gap-10 md:gap-0 bg-gradient-to-r from-0% from-indigo-400 to-indigo-200 text-white rounded-3xl p-20">
				<div className="grow">
					<h2 className="text-xl font-bold drop-shadow-md mb-2">
						Ready to Transform Your Profile?
					</h2>
					<p className="font-medium drop-shadow-md">
						Join the future of interactive blockchain profiles
						today.
					</p>
				</div>
				<ConnectButton />
			</section>
			<section className="-mx-5">
				<Footer />
			</section>
		</article>
	);
}
