import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { restaurantImages } from '../../context/restaurantImages';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { setSelectedTime } from '../../store/reservations';
import { Modal } from '../../context/Modal';
import LoginForm from "../LoginFormModal/LoginForm";

const RestaurantTile = ({restaurant}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.reservations.selectedDate);
    const selectedSize = useSelector(state => state.reservations.selectedSize);
    const [restaurantImage] = useState(restaurantImages[Math.floor(Math.random() * restaurantImages.length)]);
    const [randomBookingCount, setRandomBookingCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    let history = useHistory();
 
    const getPriceSymbol = (price) => {
        if (price === '$30 and under') {
            return '$';
        } else if (price === '$31 to $50') {
            return '$$';
        } else if (price === '$50 and over') {
            return '$$$';
        } else {
            return price;
        }
    };

    useEffect(() => {
        const newRandomBookingCount = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        setRandomBookingCount(newRandomBookingCount);
      }, []);    

    const handleTimeSelect = (time) => {
        if (!user) {
            setShowModal(true);
            return;
        }

        dispatch(setSelectedTime(time));
        history.push(`/restaurants/${restaurant.id}/create?partySize=${selectedSize}&time=${time}&date=${selectedDate}`);
    }

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm onClose={() => setShowModal(false)} />
                </Modal>
            )}
            <div className='tile-img-container'>
                <img src={restaurantImage}></img>
            </div>
            <div className='tile-info'>
                <h5>{restaurant.name}</h5>
                <div className='overview-info-component'>
                    <div>
                        <i data-star={restaurant.rating}></i>
                    </div>
                    <p id='review-count'>10 reviews</p>
                </div>
                <p>{restaurant.cuisine} • {getPriceSymbol(restaurant.price)} • {restaurant.neighborhood}</p>
                <div className='book-count'>
                    <div>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        >
                        <path d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z" fill="#2D333F" fillRule="nonzero"></path>
                        </svg>
                    </div>
                    <p>Booked {randomBookingCount} times today</p>
                </div>
                <div className='home-time-bttns'>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleTimeSelect("1:00 PM");
                    }}>1:00 PM</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleTimeSelect("1:15 PM");
                    }}>1:15 PM</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleTimeSelect("1:30 PM");
                    }}>1:30 PM</button>
                </div>
            </div>
        </>
    )
}

export default RestaurantTile;