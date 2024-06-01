import React from 'react';

export function LoginPopup({ showPopup }: { showPopup: boolean }) {
    return (
        showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
                    <p className="mb-4 text-black">Por favor, confirme el correo de verificación que se le ha enviado.</p>
                </div>
            </div>
        )
    );
}
