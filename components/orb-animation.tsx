'use client';

import dynamic from 'next/dynamic';
import OrbAnimationJSON from '@/public/orb-animation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function OrbAnimation() {
	return (
		<Lottie
			animationData={OrbAnimationJSON}
			loop
		/>
	);
}
