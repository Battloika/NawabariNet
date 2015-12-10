class RemovePaintedMapFromPages < ActiveRecord::Migration
  def change
    remove_column :pages, :painted_map
  end
end
