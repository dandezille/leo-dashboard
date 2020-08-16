class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.time :time
      t.string :symbol
      t.text :note

      t.timestamps
    end
  end
end
