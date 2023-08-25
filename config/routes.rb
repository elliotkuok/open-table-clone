Rails.application.routes.draw do
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

    resources :restaurants, only:[:show, :index] do
      collection do
        get 'search'
      end
    end

    resources :reservations, only:[:create, :show, :update, :destroy, :index]
  end

  get '*path', to: "static_pages#frontend_index"
end
