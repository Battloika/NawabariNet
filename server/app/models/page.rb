class Page < ActiveRecord::Base
  belongs_to :domain
  has_many :paints

  serialize :painted_map, Array

  def self.normalize_url(url)
    Addressable::URI.parse(NormalizeUrl.process(url))
  end

  def calc_total_points
    self.paints.inject(0.0) { |sum, paint| sum + paint.point }
  end
end
