module API
  module V1
    class Pages < Grape::API
      helpers do
        params :attributes do
          requires :api_key, type: String, desc: "API key."
          requires :url, type: ::Utils::Url, desc: "Page url.", documentation: { example: 'http://sample.com' }
        end
      end

      resource :pages do
        desc 'GET /api/v1/pages'
        params do
          use :attributes
        end
        get '/', http_codes: [
          [200, 'Success', Entity::V1::PageWithTotalpoints],
          [400, 'Invalid parameter'],
          [401, 'Unauthorized (Invalid API key)'],
          [500, 'Internal Server Error']
        ] do
          authenticate!

          normalize_url = Page.normalize_url(params[:url].value)
          page = Page.find_by(url: normalize_url.to_s)

          if page
            present page, with: Entity::V1::PageWithTotalpoints
          else
            { page_id: nil, url: normalize_url.to_s, painted_map: nil, total_points: nil }
          end
        end
      end
    end
  end
end
