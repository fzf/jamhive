Jamhive::Application.routes.draw do
  resources :songs do
    resources :tracks
  end

  root to: 'home#index'
end
