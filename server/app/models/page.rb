class Page < ActiveRecord::Base
  belongs_to :domain
  has_many :paints

  def self.normalize_url(url)
    NormalizeUrl.process(url)
  end
end
