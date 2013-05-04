Jamhive::Application.routes.draw do
  resources :songs

  root to: 'songs#new'

end
