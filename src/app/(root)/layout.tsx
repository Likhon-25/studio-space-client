import { Navbar } from '@/components/Layout/Navbar';
import React from 'react';

const layout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div>
            <main>
                <Navbar />
                {children}
            </main>
        </div>
    );
};

export default layout;