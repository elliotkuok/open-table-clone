class Api::ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]

  def index
    @reviews = Review.all
    render :index
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def show
    render :show
  end

  def update
    if @review.update(review_params)
      render :show
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    render :show
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end

  def review_params
    params.require(:review).permit(:reservation_id, :overall_rating, :food_rating, :service_rating, :ambience_rating, :value_rating, :content)
  end
end
