class Api::ReservationsController < ApplicationController
  before_action :current_user, only: [:create, :update, :destroy, :index]
  before_action :set_reservation, only: [:show, :update, :destroy]
  before_action :authorize_reservation, only: [:update, :destroy]

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.user_id = current_user.id
    
    if @reservation.save
      render :show
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def show
    render :show
  end

  def update
    if @reservation.update(reservation_params)
      render :show
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation.destroy
    render :show
  end

  def index
    if params[:restaurant_id]
      @reservations = Reservation.where(restaurant_id: params[:restaurant_id])
    else
      @reservations = current_user.reservations
    end
    render :index
  end

  private
  
  def set_reservation
    @reservation = Reservation.find_by(id: params[:id])
    unless @reservation
      render json: { error: "Reservation not found" }, status: :not_found
    end
  end

  def authorize_reservation
    unless @reservation.user_id == current_user.id
      render json: { error: "Unauthorized reservation action" }, status: :forbidden
    end
  end

  def reservation_params
    params.require(:reservation).permit(:restaurant_id, :user_id, :review_id, :date, :time, :party_size, :occasion, :special_request)
  end
end
