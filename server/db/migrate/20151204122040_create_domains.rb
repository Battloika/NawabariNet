class CreateDomains < ActiveRecord::Migration
  def change
    create_table :domains do |t|
      t.string :domain, null: false
    end
  end
end
