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
                <div
                    className="fixed z-50 left-6 transition-all duration-200"
                    style={{ top: scrolled ? '5rem' : '2.5rem' }}
                >
                    <Link to="/">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default PageHeader; 