module Entity
  module V1
    class Page < Grape::Entity
      expose :id, :url, :title, :painted_map, :created_at, :updated_at

      expose :domain, using: Entity::V1::Domain
    end
  end
end
