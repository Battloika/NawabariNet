require "rails_helper"

describe Api do
  include ApiHelper

  describe Paint do
    describe 'POST /api/v1/paints' do
      let (:path) { '/api/v1/paints' }
      let (:api_key) { ENV.fetch('API_KEY') }
      let (:url) { 'http://hoge.com/' }
      let (:painted_map) { Array.new(10).map { Array.new(10).map { rand(2) } } }
      let (:parameters) do
        {
          api_key: api_key,
          url: url,
          painted_map: painted_map
        }
      end
      let (:rack_env) { { "CONTENT_TYPE" => "application/json" } }

      context 'when api_key is invalid' do
        let (:api_key) { 'InvalidApiKey' }

        let (:result) do
          {
            error: 'Unauthorized (Invalid API key)'
          }
        end

        it_behaves_like('401 Unauthorized')
      end

      context 'when url is invalid' do
        let (:url) { 'InvalidUrl' }

        let (:result) do
          {
            error: 'url is invalid'
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('400 Bad Request')
      end

      context 'when pointed_map is invalid' do
        let (:painted_map) { Array.new(10).map { Array.new(10).map { rand(3) } } }

        let (:result) do
          {
            error: 'painted_map is invalid'
          }
        end

        it_behaves_like('400 Bad Request')
      end

      context 'success' do
        let (:result) do
          {
            id:      Fixnum,
            point:   (painted_map.flatten.count(1).to_f / painted_map.flatten.size.to_f * 100).round(1),
            created_at: /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+09:00/,
            updated_at: /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+09:00/,
            page: {
              id: Fixnum,
              url: Page.normalize_url(url).to_s,
              title: nil,
              painted_map: painted_map,
              created_at: /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+09:00/,
              updated_at: /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+09:00/,
              domain: {
                id: Fixnum,
                domain: Page.normalize_url(url).host
              }
            }
          }
        end

        it_behaves_like('201 Created')
      end
    end
  end
end
