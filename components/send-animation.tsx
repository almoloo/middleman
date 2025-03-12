'use client';

import dynamic from 'next/dynamic';
import SendAnimationJSON from '@/public/send-animation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function SendAnimation() {
	return (
		<Lottie
			animationData={SendAnimationJSON}
			loop
			className="max-w-[300px]"
		/>
	);
}
