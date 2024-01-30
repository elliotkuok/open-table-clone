import { useDispatch, useSelector } from "react-redux";
import './ReservationPage.css';
import { fetchReservation, selectReservation } from "../../store/reservations";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useState } from "react";
import { Modal } from '../../context/Modal';
import CancelForm from "../CancelFormModal";
import { selectRestaurant, fetchRestaurant } from "../../store/restaurants";
import moment from "moment";

const ReservationPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const reservation = useSelector(state => state.reservations[id]);
    const restaurantId = reservation?.restaurantId;
    // const restaurant = useSelector(selectRestaurant(restaurantId?.toString()));
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        if (!reservation) {
            dispatch(fetchReservation(id));
        }
    }, [id, dispatch]);

    
    useEffect(() => {
        if (restaurantId) {
            dispatch(fetchRestaurant(restaurantId));
        }
    }, [restaurantId]);
    
    const restaurant = useSelector(state => {
        if (restaurantId) {
            return state.restaurants[restaurantId]
        }
    });
    
    if (!reservation) {
        return <div>Loading...</div>;
    }
    const dateTimeString = `${reservation.date} ${reservation.time}`;
    const reservationDate = moment(dateTimeString, 'MMM D, YYYY h:mm A').toDate();

    const currentDate = new Date();


    const reservationStatus = reservationDate > currentDate;

    const confirmedIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            >
            <path d="M11.0355339,12.863961 L9.62132034,11.4497475 C9.23079605,11.0592232 8.59763107,11.0592232 8.20710678,11.4497475 C7.81658249,11.8402718 7.81658249,12.4734367 8.20710678,12.863961 L10.3284271,14.9852814 C10.5236893,15.1805435 10.7796116,15.2781746 11.0355339,15.2781746 C11.2914562,15.2781746 11.5473785,15.1805435 11.7426407,14.9852814 L15.9852814,10.7426407 C16.3758057,10.3521164 16.3758057,9.71895142 15.9852814,9.32842712 C15.5947571,8.93790283 14.9615921,8.93790283 14.5710678,9.32842712 L11.0355339,12.863961 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z" fill="#39a25e"></path>
        </svg>
    );

    const completedIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            >
            <path fillRule="evenodd" clipRule="evenodd" d="M3.54142 5.74079C3.6587 5.3038 4.05479 5 4.50724 5H20.5535C21.0595 5 21.4858 5.37796 21.5463 5.88033L22.9928 17.8803C23.0271 18.1643 22.938 18.4494 22.7482 18.6634C22.5584 18.8775 22.2861 19 22 19H6.45517C5.96641 19 5.54926 18.6467 5.46881 18.1646L5.16463 16.3418H2.00001C1.68905 16.3418 1.39578 16.1972 1.20653 15.9504C1.01728 15.7037 0.953583 15.3829 1.03419 15.0826L3.54142 5.74079ZM6.99929 15.1853L7.30212 17H20.8722L19.6668 7H5.68826L6.49645 11.8351L6.49906 11.8516L6.99929 15.1853ZM4.27983 10.7051L4.52244 12.1566L4.85033 14.3418H3.30379L4.27983 10.7051Z" fill="#2D333F"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 12C8.5 11.4477 8.94772 11 9.5 11L17.2254 11C17.7777 11 18.2254 11.4477 18.2254 12C18.2254 12.5523 17.7777 13 17.2254 13L9.5 13C8.94772 13 8.5 12.5523 8.5 12Z" fill="#2D333F"></path>
        </svg>
    );
    
    return (
        <div id="reservation-page-container">
            <div className="res-container">
                <div>
                    <div className='res-details-container'>
                        <div className='res-img-container'>
                            <img
                            src={restaurant?.image}
                            alt="Placeholder"
                            />
                        </div>
                        <div className='res-request-info'>
                            <Link to={`/restaurants/${restaurantId}`}>
                                {reservation.restaurantName}
                            </Link>
                            <div className='res-confirmed'>
                                {reservationStatus ? confirmedIcon : completedIcon}
                                <p>{reservationStatus ? 'Reservation confirmed' : 'Reservation completed'}</p>
                            </div>
                            <div className='table-res-details'>
                                <div className='res-specs'>
                                    <div>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        >
                                        <path d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z" fill="#2D333F"></path>
                                        </svg>
                                    </div>
                                    <p>{reservation.partySize}</p>
                                </div>
                                <div className='res-specs'>
                                    <div>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        >
                                        <path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z" fill="#2D333F"></path>
                                        </svg>
                                    </div>
                                    <p>{reservation.date} at {reservation.time}</p>
                                </div>
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
                <div id="reservation-page-buttons-container">
                    
                    <a className="reservation-page-button">
                        <div className="res-page-bttn-content">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.89543 4 3 4.89543 3 6V15C3 16.1046 3.89543 17 5 17H11L15.36 20.63C15.6583 20.8785 16.0735 20.9318 16.425 20.7668C16.7765 20.6018 17.0006 20.2483 17 19.86V17H19C20.1046 17 21 16.1046 21 15V6C21 4.89543 20.1046 4 19 4ZM7.75 9.5C7.05964 9.5 6.5 10.0596 6.5 10.75C6.5 11.4404 7.05964 12 7.75 12C8.44036 12 9 11.4404 9 10.75C9 10.0596 8.44036 9.5 7.75 9.5ZM11 10.75C11 10.0596 11.5596 9.5 12.25 9.5C12.9404 9.5 13.5 10.0596 13.5 10.75C13.5 11.4404 12.9404 12 12.25 12C11.5596 12 11 11.4404 11 10.75ZM16.25 9.5C15.5596 9.5 15 10.0596 15 10.75C15 11.4404 15.5596 12 16.25 12C16.9404 12 17.5 11.4404 17.5 10.75C17.5 10.0596 16.9404 9.5 16.25 9.5Z" fill="#FFF"></path>
                                </svg>
                            </span>
                            <p>Send message</p>
                        </div>
                    </a>
                    <a className="reservation-page-button">
                    <div className="res-page-bttn-content">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    >
                                    <path d="M20.9387 4.57022L15.0619 22.1841C14.8534 22.809 14.1773 23.1468 13.5518 22.9385C13.2356 22.8332 12.9779 22.6007 12.8409 22.2972L9.53042 14.9614C9.41001 14.6946 9.19562 14.4814 8.92805 14.3622L1.70817 11.1476C1.10592 10.8795 0.835288 10.1743 1.10369 9.57264C1.24007 9.26691 1.49877 9.03249 1.81662 8.92665L19.4286 3.06153C20.0541 2.85322 20.7302 3.19096 20.9387 3.81588C21.0204 4.0607 21.0204 4.3254 20.9387 4.57022Z" fill="#FFF"></path>
                                </svg>
                            </span>
                            <p>Get directions</p>
                        </div>
                    </a>
                </div>
                
            </div>
            <div id="diner-details">
                <h3>{currentUser.firstName} {currentUser.lastName}</h3>
                <p>Joined in October 2017</p>
            </div>
        </div>
    )
}

export default ReservationPage;