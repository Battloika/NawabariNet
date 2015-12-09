require "rails_helper"

describe Api do
  include ApiHelper

  describe Page do
    let (:path) { '/api/v1/pages' }
    let (:api_key) { ENV.fetch('API_KEY') }
    let (:url) { 'http://hoge.com/' }
    let (:rack_env) { { "CONTENT_TYPE" => "application/json" } }

    describe 'GET /api/v1/pages' do
      let (:parameters) do
        {
          api_key: api_key,
          url: url
        }
      end

      context 'when api_key is invalid' do
        let (:api_key) { 'InvalidApiKey' }

        let (:result) do
          {
            error: 'Unauthorized (Invalid API key)'
          }
        end

        before do
          get path, parameters, rack_env
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
          get path, parameters, rack_env
        end
        it_behaves_like('400 Bad Request')
      end

      context 'success_new_page' do
        let (:result) do
          {
            page_id: nil,
            url: Page.normalize_url(url),
            painted_map: nil,
            total_points: nil
          }
        end

        before do
          get path, parameters, rack_env
        end
        it_behaves_like('200 Success')
      end

      context 'success' do
        let (:domain) { create(:domain) }
        let (:page) { domain.pages[0] }
        let (:url) { page.url }
        let (:total_points) { page.calc_total_points }
        let (:result) do
          {
            page_id: page.id,
            url: page.url,
            painted_map: page.painted_map,
            total_points: total_points
          }
        end

        before do
          get path, parameters, rack_env
        end
        it_behaves_like('200 Success')
      end
    end
  end
end
