import { useState, useEffect } from "react";

// TODO: type it
const useInfiniteScroll = (callback: any): any => {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching]);

    function isScrolling() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            isFetching
        )
            return;
        setIsFetching(true);
    }
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;