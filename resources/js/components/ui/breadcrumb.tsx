import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav className="my-3">
            <ol className="flex items-center">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <li className={isLast ? 'text-primary' : 'text-slate-400'}>
                                {isLast ? <span>{item.title}</span> : <Link href={item.link}>{item.title}</Link>}
                            </li>
                            {!isLast && <span className="mx-2 text-slate-400">/</span>}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
