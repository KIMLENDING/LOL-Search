'use client'
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const GaspTest2 = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.Context>();

    // animateBoxes를 useCallback으로 메모이제이션
    const animateBoxes = useCallback(() => {
        const parentWidth = (parentRef.current?.offsetWidth || 0) / 2 - 50;

        // 컨텍스트 내에서 애니메이션 실행
        animationRef.current?.add(() => {
            gsap.to(".box1", {
                rotation: 360,
                x: parentWidth,
                duration: 1,
                overwrite: true // 진행 중인 애니메이션 덮어쓰기
            });
            gsap.to(".box2", {
                rotation: 360,
                x: -parentWidth,
                duration: 1,
                overwrite: true
            });
        });
    }, []);

    // useGSAP로 컨텍스트 생성 및 초기 애니메이션
    useGSAP(() => {
        // GSAP 컨텍스트 생성 및 저장
        animationRef.current = gsap.context(() => {
            animateBoxes();
        }, parentRef);

        // 클린업 함수
        return () => animationRef.current?.revert();
    }, { scope: parentRef, dependencies: [animateBoxes] });

    // resize 이벤트에 디바운싱 적용
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(animateBoxes, 250); // 250ms 디바운스
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [animateBoxes]);

    return (
        <div
            ref={parentRef}
            className="aspect-video rounded-xl bg-muted/50 py-2 px-4 flex flex-col gap-3 justify-center items-center"
        >
            <div className="box1 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400" />
            <div className="box2 w-[75px] h-[75px] rounded-lg bg-gradient-to-tl from-blue-100 to-blue-400" />
        </div>
    );
};

export default GaspTest2;

/**
 * GSAP 컨텍스트 활용:

animationRef를 사용하여 GSAP 컨텍스트를 저장하고 관리
컴포넌트 언마운트 시 모든 애니메이션을 자동으로 정리


성능 최적화:

useCallback을 사용하여 animateBoxes 함수 메모이제이션
resize 이벤트에 디바운싱 적용 (250ms)
overwrite: true 옵션으로 진행 중인 애니메이션 충돌 방지


메모리 관리:

모든 이벤트 리스너와 타임아웃 적절히 정리
GSAP 컨텍스트의 revert() 메서드로 클린업


타입 안정성:

TypeScript 타입 명시
NodeJS.Timeout 타입 사용



이러한 개선사항들은 특히 다음과 같은 상황에서 더 나은 성능을 제공합니다:

빈번한 리사이즈 이벤트 발생 시
여러 애니메이션이 동시에 실행될 때
컴포넌트가 자주 마운트/언마운트될 때

필요에 따라 디바운스 시간을 조절하거나 애니메이션 duration을 수정하실 수 있습니다.
 */