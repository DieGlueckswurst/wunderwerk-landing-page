
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    showBackButton?: boolean;
}

const PageHeader = ({ title, showBackButton = true }: PageHeaderProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="pt-10 pb-8">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-0">{title}</h1>
            </div>
            {showBackButton && (
                <Link to="/" style={{ 
                    position: 'fixed',
                    left: '1.5rem',
                    top: scrolled ? '5rem' : '2.5rem',
                    zIndex: 1000,
                    transition: 'top 0.2s ease'
                }}>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
            )}
        </section>
    );
};

export default PageHeader;
