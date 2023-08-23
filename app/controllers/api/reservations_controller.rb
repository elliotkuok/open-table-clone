class Api::ReservationsController < ApplicationController
  before_action :current_user, only: [:create, :update, :destroy, :index]
  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render :show
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def show
    @reservation = Reservation.find_by(id: params[:id])
    render :show
  end

  def update
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation.update(reservation_params)
      render :show
    else
      render json: { errors: @reservation.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation
      if @reservation.user_id == current_user.id && @reservation.destroy
        render :show
      else
        render json: { error: "Unauthorized reservation deletion" }, status: :not_found
      end
    else
      render json: { error: "Reservation not found" }, status: :not_found
    end
  end

  def index
    @reservations = Reservation.all
    render :index
  end

  private
  def reservation_params
    params.require(:reservation).permit(:restaurant_id, :user_id, :review_id, :date, :time, :party_size, :occasion, :special_request)
  end
end
