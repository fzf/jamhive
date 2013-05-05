class AddAudioToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :audio, :string
  end
end
