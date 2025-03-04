"use client"

import { useEffect, useState } from 'react'
import axios from 'axios';

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        axios.get("/api/users")
            .then((res) => setData(res.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);
    return { data, error, loading };
}

export default useFetch