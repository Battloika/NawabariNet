class Page < ActiveRecord::Base
  belongs_to :domain
  has_many :paints
end
