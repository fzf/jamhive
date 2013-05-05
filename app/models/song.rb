class Song < ActiveRecord::Base
  attr_accessible :name, :tracks_attributes

  has_many :tracks, dependent: :destroy
  accepts_nested_attributes_for :tracks, allow_destroy: true
end
