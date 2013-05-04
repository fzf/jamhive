Jamhive::Application.routes.draw do
  resources :songs

  root to: 'home#index'

end
