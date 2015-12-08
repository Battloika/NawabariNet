module Entity
  module V1
    class Paint < Grape::Entity
      root 'paint'

      expose :id, :point, :created_at, :updated_at

      expose :page, using: Entity::V1::Page
    end
  end
end
