import React from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ReactComponent as Space } from './space.svg';

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #181818;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 50%;
    }
`;

const SvgAnimation = () => {
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
        const [ elements ] = wrapperRef.current.children;

        const planet = elements.getElementById('planet');
        const moons = elements.getElementById('moons');
        const details = elements.getElementById('details');
        gsap.set([planet, moons, ...details.children], { autoAlpha: 0});
        gsap.set(moons, {transformOrigin: '50% 50%'} )

        const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

        tl.fromTo(planet, {opacity: 0}, {duration: 1, opacity: 1, autoAlpha: 1})
        .fromTo(moons, {scale: 0}, {duration: 3, scale: 1, autoAlpha: 1})
        .to(details.children, {duration: 5, autoAlpha: 1, stagger: 0.1})
    }, [])
    return (
        <Wrapper ref={wrapperRef}>
            <Space />
        </Wrapper>
    );
};

export default SvgAnimation;