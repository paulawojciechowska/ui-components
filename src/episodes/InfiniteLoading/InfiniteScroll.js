import React, {useState, useEffect, useRef, useCallback} from 'react';
import data from './beers.json';
import * as paginate from 'paginatejson';
import styled, {keyframes} from 'styled-components';

// Styles

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 400px 400px;
    grid-template-rows: auto;
    grid-gap: 50px;
`;

const BeerWrapper = styled.div`
    border: 10px solid black;
    position: relative;
    padding: 20px 0 20px 30px;
    img {
        height: 380px;
        object-fit: contain;
    }
    div {
        position: absolute;
        background-color: #ffd121;
        width: 100%;
        left: 0;
        bottom: 10%;
        font-weight: bold;
        text-align: right;
        padding-right: 15px;
        z-index: -1;
    }
`;
const loaderAppear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const bubbling = keyframes`
    0%{
        opacity: 0;
        transform: translateY(300%);
    }
    50%{
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-800%);
    }
`;
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 400px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(0deg, white, rgba(255,255,255,0));
    animation: 0.2s ease-in forwards 1 ${loaderAppear};
    p {
        font-size: 35px;
        font-weight: bold;
        text-shadow: 4px 2px #ffd121;
    }
`;
const Bubbles = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
`;
const Bubble = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: rgba(255, 209, 33, 0.8);
    opacity: 0;
    animation: linear infinite forwards ${bubbling};
    animation-duration: ${() => {
        return `${Math.random() * (3 - 0.25 + 1) + 0.25}s`
    }};
    animation-delay: ${() => {
        return `${Math.ceil(Math.random() * (2 - 0.25 + 1) + 0.25)}s`
    }};

`;
// End of styles
const Loader = () => (
    <LoaderWrapper>
        <Bubbles>
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
            <Bubble />
        </Bubbles>
        <p>Loading...</p>
    </LoaderWrapper>
);
const fetchBeers = (page = 1) => {
    const {items, ...pageInfo} = paginate.paginate(data, page, 6);
    return new Promise(resolve => setTimeout(() => resolve({items, page: pageInfo}), 2000));
}

const getShortName = (name) => {
    const words = name.split(' ');
    return `${words[0]} ${words[1]}`
}
const Beer = React.forwardRef(({data: {image_url: imageUrl, name, abv}}, ref) => {
    return (
        <BeerWrapper ref={ref}>
            <img src={imageUrl} alt={name} />
            <div>
                <p>{name.length > 12 ? getShortName(name) : name}</p>
                <p>ABV: {abv}</p>
            </div>
        </BeerWrapper>
    )
})
const InfiniteScroll = () => {
    const [page, setPage] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const lastItemRef = useRef(null);
    const observer = useRef(null);

    useEffect( () => {
        fetchBeers()
            .then(res => {
                setItems([...res.items]);
                setPage(res.page);
        })
    }, [])
    const getMoreBears = useCallback(() => {
        if (!page || !page.next || isLoading) return;
        setisLoading(true);
        fetchBeers(page.next)
            .then(res=> {
                setItems(i => [...i, ...res.items]);
                setPage(res.page);
                setisLoading(false);
            })
    }, [page, isLoading])

    useEffect( ()=>{
        // Create IO
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                getMoreBears();
            }
        }, {
            root: document,
            threshold: 1,
        })
        // Start observing
        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }
        // Disconnect
        return () => {
            observer.current.disconnect();
        }
    }, [getMoreBears])
    return (
        <>
            <Wrapper>
                <h2>Infinite scroll 🎉</h2>
                {items.map((item, i) => {
                    if (i === items.length -1) return <Beer key={item.id} data={item} ref={lastItemRef} />
                    return <Beer key={item.id} data={item} />
                })}
            </Wrapper>
            {isLoading && <Loader />}
        </>
    )
};

export default InfiniteScroll