class Paint < ActiveRecord::Base
  belongs_to :page

  def self.calc_points(painted_map)
    (painted_map.flatten.count(1).to_f / painted_map.flatten.size.to_f * 100).round(1)
  end
end
