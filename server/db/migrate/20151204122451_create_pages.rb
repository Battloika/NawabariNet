class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :url, null: false
      t.string :title
      t.text :painted_map, null: false
      t.references :domain, null: false, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
