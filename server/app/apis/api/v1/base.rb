module API
  module V1
    class Base < Grape::API
      format :json
      default_format :json

      prefix :api
      version 'v1', using: :path

      # 404 : Not Found
      rescue_from ActiveRecord::RecordNotFound do |e|
        rack_response({ message: e.message, status: 404 }.to_json, 404)
      end

      # 400 : Bad Request
      rescue_from Grape::Exceptions::ValidationErrors do |e|
        rack_response(e.to_json, 400)
      end

      # 500 : Internal Server Error
      rescue_from :all do |e|
        if Rails.env.development?
          raise e
        else
          error_response(message: "Internal server error", status: 500)
        end
      end

      mount V1::Paints
    end
  end
end
