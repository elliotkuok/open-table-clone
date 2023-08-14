class ApplicationController < ActionController::API
    helper_method :current_user, :logged_in?
    before_action :snake_case_params

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        redirect_to new_session_url unless logged_in?
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token! if logged_in?
        session[:session_token] = nil
        @current_user = nil
    end

    def test
        if params.has_key?(:login)
          login!(User.first)
        elsif params.has_key?(:logout)
          logout!
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'email', 'session_token', 'first_name', 'last_name', 'phone_number') }
        else
          render json: ['No current user']
        end
    end

    private
    
    def snake_case_params
      params.deep_transform_keys!(&:underscore)
    end
end
