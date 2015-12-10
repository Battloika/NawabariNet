module API
  module V1
    class Paints < Grape::API
      helpers do
        def create_points(page, painted_map)
          Paint.create({
            point: Paint.calc_points(painted_map),
            page_id: page.id
          })
        end

        params :attributes do
          requires :api_key, type: String, desc: "API key."
          requires :url, type: ::Utils::Url, desc: "Page url.", documentation: { param_type: 'form', example: 'http://sample.com' }
          requires :painted_map, type: ::Utils::PaintedMap, desc: "Page painted_map.", documentation: { param_type: 'form', example: Array.new(10).map { Array.new(10).map { rand(2) } }.to_s }
          optional :title, type: String, desc: "Page title.", documentation: { example: 'page title' }
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
          painted_map = params[:painted_map].value

          page = Page.find_by(url: normalize_url.to_s)
          if page
            painted_map.each_with_index do |row, row_i|
              row.each_with_index do |col, col_i|
                page.painted_map[row_i][col_i] = 1 if col == 1
              end
            end
            page.save
            paints = create_points(page, painted_map)
          else
            domain = Domain.find_or_create_by(domain: normalize_url.host)
            page = Page.create({
              url: normalize_url.to_s,
              painted_map: painted_map,
              title: params[:title],
              domain_id: domain.id
            })
            paints = create_points(page, painted_map)
          end

          present paints, with: Entity::V1::PageAndPaint
        end
      end
    end
  end
end
