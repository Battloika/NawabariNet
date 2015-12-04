class CreatePaints < ActiveRecord::Migration
  def change
    create_table :paints do |t|
      t.float :point, null: false
      t.references :page, null: false, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
