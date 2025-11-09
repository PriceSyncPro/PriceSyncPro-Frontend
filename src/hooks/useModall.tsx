import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export enum ModalType {
    DELETE = 0,
    ADD = 1,
    WARNING = 2
}

interface UseModalReturn {
    isOpen: boolean;
    itemId: string | null;
    openModal: (id?: string) => void;
    closeModal: () => void;
    confirmAction: () => Promise<void>;
    Modal: React.FC;
}

interface UseModalProps {
    type: ModalType;
    onConfirm: (id?: string) => Promise<void>;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

const getModalConfig = (type: ModalType) => {
    switch (type) {
        case ModalType.DELETE:
            return {
                icon: (
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                ),
                defaultTitle: "Öğeyi Sil",
                defaultDescription: "Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
                confirmButtonClass: "flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors",
                defaultConfirmText: "Sil",
                defaultCancelText: "İptal"
            };
        case ModalType.ADD:
            return {
                icon: (
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                ),
                defaultTitle: "Öğe Ekle",
                defaultDescription: "Bu öğeyi eklemek istediğinizden emin misiniz?",
                confirmButtonClass: "flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors",
                defaultConfirmText: "Ekle",
                defaultCancelText: "İptal"
            };
        case ModalType.WARNING:
            return {
                icon: (
                    <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                ),
                defaultTitle: "Uyarı",
                defaultDescription: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
                confirmButtonClass: "flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition-colors",
                defaultConfirmText: "Tamam",
                defaultCancelText: "İptal"
            };
        default:
            return getModalConfig(ModalType.WARNING);
    }
};

export function useModall({
    type,
    onConfirm, 
    title,
    description,
    confirmText,
    cancelText
}: UseModalProps): UseModalReturn {
    const [isOpen, setIsOpen] = useState(false);
    const [itemId, setItemId] = useState<string | null>(null);
    
    const config = getModalConfig(type);

    const openModal = (id?: string) => {
        setItemId(id || null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setItemId(null);
    };

    // Handle escape key press
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const confirmAction = async () => {
        setIsOpen(false);
        await onConfirm(itemId || undefined);
        setItemId(null);
    };

    const Modal: React.FC = () => {
        if (!isOpen || typeof window === 'undefined') return null;

        const modalContent = (
            <div 
                className="fixed inset-0 z-[99999] flex items-center justify-center"
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    margin: 0,
                    padding: 0
                }}
                onClick={closeModal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div 
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-2xl max-w-md w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0" aria-hidden="true">
                            {config.icon}
                        </div>
                        <div className="flex-1">
                            <h3 
                                id="modal-title"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                {title || config.defaultTitle}
                            </h3>
                            <p 
                                id="modal-description"
                                className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                            >
                                {description || config.defaultDescription}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={closeModal}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="button"
                        >
                            {cancelText || config.defaultCancelText}
                        </button>
                        <button
                            onClick={confirmAction}
                            className={`${config.confirmButtonClass} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                            type="button"
                        >
                            {confirmText || config.defaultConfirmText}
                        </button>
                    </div>
                </div>
            </div>
        );

        return createPortal(modalContent, document.body);
    };

    return {
        isOpen,
        itemId,
        openModal,
        closeModal,
        confirmAction,
        Modal
    };
}

// Backward compatibility - keeping the old useDeleteModal function
export function useDeleteModal({ 
    onDelete, 
    title = "Ürünü Sil", 
    description = "Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve ürün kalıcı olarak silinecektir." 
}: { 
    onDelete: (id: string) => Promise<void>;
    title?: string;
    description?: string;
}) {
    const { openModal, closeModal, Modal } = useModall({
        type: ModalType.DELETE,
        onConfirm: async (id?: string) => {
            if (id) await onDelete(id);
        },
        title,
        description
    });

    return {
        openDeleteModal: (id: string) => openModal(id),
        closeDeleteModal: closeModal,
        DeleteModal: Modal
    };
}
