module API
  module V1
    class Paints < Grape::API
      helpers do
        def authenticate!
          unless params[:api_key] == ENV.fetch('API_KEY')
            error!('Unauthorized. Invalid key.', 401)
          end
        end

        def calc_points(page, painted_map)
          # 塗った割合(%)をpointとする
          Paint.create({
            point: (painted_map.flatten.count(1).to_f / painted_map.flatten.size.to_f * 100).round(1),
            page_id: page.id
          })
        end

        params :attributes do
          requires :api_key, type: String, desc: "API key."
          requires :url, type: String, desc: "Page url.", documentation: { example: 'http://sample.com' }
          requires :painted_map, type: ::Utils::PaintedMap, desc: "Page painted_map.", documentation: { param_type: 'form', example: Array.new(10).map { Array.new(10).map { rand(2) } }.to_s }
        end
      end

      resource :paints do
        desc 'POST /api/v1/paints'
        params do
          use :attributes
        end
        post '/' do
          authenticate!

          normalize_url = Page.normalize_url(params[:url])
          painted_map = params[:painted_map].value

          page = Page.find_by(url: normalize_url.to_s)
          if page
            painted_map.each_with_index do |row, row_i|
              row.each_with_index do |col, col_i|
                page.painted_map[row_i][col_i] = 1 if col == 1
              end
            end
            page.save
            calc_points(page, painted_map)
          else
            domain = Domain.find_or_create_by(domain: normalize_url.host)
            page = Page.create({
              url: normalize_url.to_s,
              painted_map: painted_map,
              domain_id: domain.id
            })
            calc_points(page, painted_map)
          end
        end
      end
    end
  end
end
