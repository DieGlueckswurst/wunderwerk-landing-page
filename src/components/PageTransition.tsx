import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();

    return (
        <div
            key={location.pathname}
            className="page-fade"
        >
            {children}
        </div>
    );
};

export default PageTransition; 