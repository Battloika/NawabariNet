module Entity
  module V1
    class Domain < Grape::Entity
      expose :id, :domain
    end
  end
end
