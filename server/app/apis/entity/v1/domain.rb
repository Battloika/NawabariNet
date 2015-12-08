module Entity
  module V1
    class Domain < Grape::Entity
      expose :id, documentation: { type: 'Integer' }
      expose :domain, documentation: { type: 'String' }
    end
  end
end
