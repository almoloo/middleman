'use client';

import dynamic from 'next/dynamic';
import OrbAnimationJSON from '@/public/orb-animation.json';
// import Lottie from 'lottie-react';

const Lottie = dynamic(() => import('lottie-react'));

export default function OrbAnimation() {
	return (
		<Lottie
			animationData={OrbAnimationJSON}
			loop
		/>
	);
}
