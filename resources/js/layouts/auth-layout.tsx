import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
}

export default function AuthLayout({ children, title }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="">
            <h1>{title}</h1>
            {children}
        </div>
    );
}
