class ChangePointToScoreFromPaints < ActiveRecord::Migration
  def change
    remove_column :paints, :point
    add_column :paints, :score, :integer, null: false
  end
end
