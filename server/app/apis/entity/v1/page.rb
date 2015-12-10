module Entity
  module V1
    class Page < Grape::Entity
      expose :id, as: :page_id, documentation: { type: 'Integer' }
      expose :url, documentation: { type: 'String' }
      expose :title, documentation: { type: 'String' }
      expose :created_at, documentation: { type: 'String' }
      expose :updated_at, documentation: { type: 'String' }

      expose :domain, using: Entity::V1::Domain, documentation: { type: Entity::V1::Domain }
    end
  end
end
