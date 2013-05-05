class AddSongIdToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :song_id, :integer
  end
end
