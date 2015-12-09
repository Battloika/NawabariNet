module Entity
  module V1
    class PageWithTotalpoints < Entity::V1::Page
      unexpose :title
      unexpose :created_at
      unexpose :updated_at
      unexpose :domain
      expose :calc_total_points, as: :total_points, documentation: { type: 'Float' }
    end
  end
end
