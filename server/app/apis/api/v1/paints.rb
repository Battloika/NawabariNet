module API
  module V1
    class Paints < Grape::API
      helpers do
        def create_points(page, score)
          Paint.create({
            score: score,
            page_id: page.id
          })
        end

        params :attributes do
          requires :api_key, type: String, desc: "API key."
          requires :url, type: ::Utils::Url, desc: "Page url.", documentation: { param_type: 'form', example: 'http://sample.com' }
          optional :title, type: String, desc: "Page title.", documentation: { example: 'page title' }
          requires :score, type: ::Utils::Score, desc: "Paint score.", documentation: { param_type: 'form', example: 100 }
        end
      end

      resource :paints do
        desc 'POST /api/v1/paints'
        params do
          use :attributes
        end
        post '/', http_codes: [
          [201, 'OK (saved data)', Entity::V1::PageAndPaint],
          [400, 'Invalid parameter'],
          [401, 'Unauthorized (Invalid API key)'],
          [500, 'Internal Server Error']
        ] do
          authenticate!

          normalize_url = Page.normalize_url(params[:url].value)

          page = Page.find_by(url: normalize_url.to_s)
          if page
            page.save
            paints = create_points(page, params[:score].value)
          else
            domain = Domain.find_or_create_by(domain: normalize_url.host)
            page = Page.create({
              url: normalize_url.to_s,
              title: params[:title],
              domain_id: domain.id
            })
            paints = create_points(page, params[:score].value)
          end

          present paints, with: Entity::V1::PageAndPaint
        end
      end
    end
  end
end
