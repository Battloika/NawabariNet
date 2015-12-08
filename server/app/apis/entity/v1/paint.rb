module Entity
  module V1
    class Paint < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'Paint ID' }
      expose :point, documentation: { type: 'Float' }
      expose :created_at, documentation: { type: 'String' }
      expose :updated_at, documentation: { type: 'String' }

      expose :page, using: Entity::V1::Page, documentation: { type: Entity::V1::Page }
    end
  end
end
