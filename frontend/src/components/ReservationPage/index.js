import { useDispatch, useSelector } from "react-redux";
import './ReservationPage.css';
import { fetchReservation, selectReservation } from "../../store/reservations";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useState } from "react";
import { Modal } from '../../context/Modal';
import CancelForm from "../CancelFormModal";

const ReservationPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const reservation = useSelector(state => state.reservations[id]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!reservation) {
            dispatch(fetchReservation(id));
        }
    }, [id, dispatch]);

    if (!reservation) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="reservation-list-container">
            <div>
                <div className='res-details-container'>
                    <div className='res-img-container'>
                        <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="Placeholder"
                        style={{ width: '4rem', margin: '12px', height: '4rem', borderRadius: '4px'}}
                        />
                    </div>
                    <div className='res-request-info'>
                        <h1>Restaurant name</h1>
                        <div className='table-details'>
                            <p>Date: {reservation.date}</p>
                            <p>Time: {reservation.time}</p>
                            <p>Party Size: {reservation.partySize}</p>
                        </div>
                        <div className="change-res-links">
                            <Link to={`/reservations/${id}/modify`}>Modify</Link>
                            <a onClick={() => setShowModal(true)}>Cancel</a>
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <CancelForm reservationId={id} onClose={() => setShowModal(false)} />
                                </Modal>
                            )}
                            <a>Add to calendar</a>
                        </div>
                    </div>

                </div>

            </div>
            <div className="diner-details">
                <h3>{currentUser.firstName}</h3>

            </div>
            
        </div>
    )
}

export default ReservationPage;