import { ReactNode, useEffect } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Prevent body scrolling when modal is open
        if (show) {
            document.body.style.overflow = 'hidden';
        }

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose, show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative mx-4 my-6 max-h-[90vh] w-full max-w-3xl rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                {/* Close button - red circle with X */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none md:h-10 md:w-10"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Scrollable content area */}
                <div className="max-h-[calc(90vh-2rem)] overflow-y-auto rounded-2xl p-6">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
