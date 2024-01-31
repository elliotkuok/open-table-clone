Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      collection do
        get 'check_email'
      end
    end

    resource :session, only: [:show, :create, :destroy]

    resources :restaurants, only:[:show, :index] do
      collection do
        get 'search'
      end
    end

    resources :reservations, only:[:create, :show, :update, :destroy, :index]
    resources :reviews, only: [:index, :create, :show, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
