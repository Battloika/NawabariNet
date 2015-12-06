module API
  module V1
    class Paints < Grape::API
      helpers do
        # パラメータのチェック
        params :attributes do
          requires :url, type: String, desc: "Page url."
          requires :painted_map, type: Array[Integer], desc: "Page painted_map."
        end
      end

      resource :paints do
        desc 'POST /api/v1/paints'
        params do
          use :attributes
        end
        post '/' do
          normalize_url = Page.normalize_url(params[:url])

          page = Page.find_by(url: normalize_url)
          if page
            Page.create({
              url: normalize_url,
              painted_map: painted_map
            })
          else
            # 登録している場合：painted_mapをマージする
          end
        end
      end
    end
  end
end
