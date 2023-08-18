class Api::RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    render :index
  end

  def show
    @restaurant = Restaurant.find_by(id: params[:id])
    if @restaurant
      render :show
    else
      render json: @restaurant.errors.full_messages, status: 404
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :description, :phone, :cuisine, :price, :rating, :neighborhood, :hours, :dining_style, :dress_code, :parking_details, :website)
  end
end
