class AddLBufferAndRBufferToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :l_buffer, :float
    add_column :tracks, :r_buffer, :float
  end
end
