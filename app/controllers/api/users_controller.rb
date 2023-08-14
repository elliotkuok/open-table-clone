class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render :show
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :phone_number)
  end
end
