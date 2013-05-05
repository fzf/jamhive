class Track < ActiveRecord::Base
  attr_accessible :audio

  belongs_to :song
  mount_uploader :audio, AudioUploader
end
