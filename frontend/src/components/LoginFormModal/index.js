import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
// import './LoginForm.css';

function LoginFormModal(){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Sign in</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm onClose={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    );
}

export default LoginFormModal;