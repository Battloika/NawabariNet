module API
  module V1
    class Base < Grape::API
      format :json
      default_format :json

      prefix :api
      version 'v1', using: :path

      helpers do
        # 401 : Unauthorized
        def authenticate!
          unless params[:api_key] == ENV.fetch('API_KEY')
            error!('Unauthorized (Invalid API key)', 401)
          end
        end
      end

      # 404 : Not Found
      rescue_from ActiveRecord::RecordNotFound do |e|
        rack_response({error: e.message}.to_json, 404)
      end

      # 400 : Bad Request
      rescue_from Grape::Exceptions::ValidationErrors do |e|
        rack_response({error: e.message}.to_json, 400)
      end

      # 500 : Internal Server Error
      rescue_from :all do |e|
        if Rails.env.development?
          raise e
        else
          rack_response({error: e.message}.to_json, 500)
        end
      end

      mount V1::Paints
      mount V1::Pages
      add_swagger_documentation(
        api_version: 'v1',
        hide_format: true,
        hide_documentation_path: true
      )
    end
  end
end
