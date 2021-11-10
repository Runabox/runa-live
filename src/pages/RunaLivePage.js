import React from 'react';
import {
    useLocation
} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function RunaLive() {
    let query = useQuery();

    let ref = query.get("ref");
    if(ref === "upld") {
        return(
            <p>upld cool hahahahaa</p>
        );
    }

    return(
        <p>balls</p>
    );
}

export default RunaLive;