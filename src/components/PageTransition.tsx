
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
            style={{ position: 'relative', zIndex: 1 }}
        >
            {children}
        </div>
    );
};

export default PageTransition;
