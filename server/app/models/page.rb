class Page < ActiveRecord::Base
  belongs_to :domain
  has_many :paints

  def self.normalize_url(url)
    Addressable::URI.parse(NormalizeUrl.process(url))
  end

  def calc_total_scores
    self.paints.inject(0) { |sum, paint| sum + paint.score}
  end
end
