import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
    const res = await fetch('/api/transactions?userId=1');
    return res.json();
};

export const useTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
        staleTime: 1000 * 60 * 5,
    });
}
