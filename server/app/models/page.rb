class Page < ActiveRecord::Base
  belongs_to :domain
  has_many :paints

  serialize :painted_map, Array

  def self.normalize_url(url)
    Addressable::URI.parse(NormalizeUrl.process(url))
  end
end
