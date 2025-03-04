"use client"

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { Fragment } from 'react'

interface BaseItem {
    id: string | number;
}

interface ListTemplateProps<T extends BaseItem> {
    data: T[] | null;
    error?: string | null;
    loading?: boolean;
    title: string;
    renderItem: (item: T) => React.ReactNode;
}

function ListTemplate<T extends BaseItem>(props: ListTemplateProps<T>) {
    const { data, error, loading, title, renderItem } = props;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Fragment>
            <Typography variant='h4' component='h4'>{title}</Typography>
            <ul>
                {data?.map((item) => (
                    <li key={item.id}>
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default ListTemplate