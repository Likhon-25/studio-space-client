import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import React from 'react';

const layout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div>
            <main>
                <Navbar />
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default layout;
