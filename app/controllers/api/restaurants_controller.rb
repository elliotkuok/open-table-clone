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

  def search
    keyword = params[:q]
    @restaurants = Restaurant.where("name LIKE ? OR address LIKE ? OR description LIKE ? OR cuisine LIKE ? OR neighborhood LIKE ?", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
    render json: @restaurants
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :description, :phone, :cuisine, :price, :rating, :neighborhood, :hours, :dining_style, :dress_code, :parking_details, :website)
  end
end
