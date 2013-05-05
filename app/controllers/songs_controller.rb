class SongsController < ApplicationController
  respond_to :html, :json

  def index
  end

  def new
    @song = Song.new
  end

  def create
    @song = Song.create params[:song]
    respond_with @song
  end

  def show
    @song = Song.find params[:id]
    respond_with @song
  end

  def update
    @song = Song.find params[:id]
    binding.pry
    @song.update_attributes params[:song]
    respond_with @song
  end
end
