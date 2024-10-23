'use client'
import { use, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);


const GaspTest1 = () => {
    const parentRef = useRef<HTMLDivElement>(null); // 부모 요소 참조

    const animateBoxes = () => {
        const parentWidth = (parentRef.current?.offsetWidth || 0) / 2 - 50;
        gsap.to(".box1", { rotation: 360, x: parentWidth, duration: 1 });
        gsap.to(".box2", { rotation: 360, x: -parentWidth, duration: 1 });
    };

    // useGSAP로 애니메이션 초기 실행
    useGSAP(() => {
        animateBoxes();
    }, { scope: parentRef });
    useEffect(() => {
        const handleResize = () => {
            animateBoxes();
        };
        window.addEventListener('resize', handleResize);
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={parentRef} className="aspect-video rounded-xl bg-muted/50 py-2 px-4 flex flex-col gap-3 justify-center items-center" >
            <div className="box1 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400 "></div>
            <div className="box2 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400 "></div>
        </div>
    )
}

export default GaspTest1