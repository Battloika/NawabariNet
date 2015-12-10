module Entity
  module V1
    class PageAndPaint < Entity::V1::Paint
      unexpose :score
      unexpose :created_at
      unexpose :updated_at
      unexpose :page

      expose(:page_id, documentation: { type: 'Integer' }) { |model| model.page.id }
      expose(:url, documentation: { type: 'String' }) { |model| model.page.url }
    end
  end
end
