Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #adding a new route specifically for email validation
  namespace :api do
    resources :users, only: [] do
      collection do
        get 'check_email'
      end
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]

    resources :restaurants, only:[:show, :index]
    resources :reservations, only:[:create, :show, :update, :destroy, :index]
    resources :reservations, only: [:create, :show, :update, :destroy, :index] do
      collection do
        post 'create_for_form', to: 'reservations#create_for_form'
      end
    end
  end

  get '*path', to: "static_pages#frontend_index"
end
