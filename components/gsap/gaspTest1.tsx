'use client'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const GaspTest1 = () => {
    const container = useRef(null);
    const container1 = useRef(null);
    const animateBoxes = () => {
        gsap.to(".box1", { rotation: 360, position: 'relative', left: '50%', xPercent: -50, duration: 2, ease: "power2.out" });
        gsap.to(".box2", { rotation: 360, position: 'relative', right: '50%', xPercent: 50, duration: 2, ease: "power2.out" });
    };

    // useGSAP로 애니메이션 초기 실행
    useGSAP(() => {
        const ctx = gsap.context(animateBoxes, container1); // container 하위의 요소에 대해 애니메이션 적용
        return () => ctx.revert();
    }, { scope: container1, dependencies: [animateBoxes] });

    return (
        <div ref={container1}>
            <div ref={container} className="aspect-video rounded-xl bg-muted/50 py-2 px-4 flex flex-col gap-3 justify-center items-center  " >
                <div className="box1 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400 "></div>
                <div className="box2 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-red-100 to-red-400 "></div>
            </div>
            <div>
                <div className="box1 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400 "></div>
            </div>
        </div>
    )
}

export default GaspTest1