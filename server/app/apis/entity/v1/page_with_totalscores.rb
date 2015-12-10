module Entity
  module V1
    class PageWithTotalscores < Entity::V1::Page
      unexpose :title
      unexpose :created_at
      unexpose :updated_at
      unexpose :domain
      expose :calc_total_scores, as: :total_scores, documentation: { type: 'Integer' }
    end
  end
end
