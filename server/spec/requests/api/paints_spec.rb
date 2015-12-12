require 'rails_helper'

describe Api do
  include ApiHelper

  describe Paint do
    let(:path) { '/api/v1/paints' }
    let(:api_key) { ENV.fetch('API_KEY') }
    let(:url) { 'http://hoge.com/' }
    let(:title) { 'page title' }
    let(:score) { 100 }
    let(:rack_env) { { 'CONTENT_TYPE' => 'application/json' } }

    describe 'POST /api/v1/paints' do
      let(:parameters) do
        {
          api_key: api_key,
          url: url,
          title: title,
          score: score
        }
      end

      context 'when api_key is invalid' do
        let(:api_key) { 'InvalidApiKey' }

        let(:result) do
          {
            error: 'Unauthorized (Invalid API key)'
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('401 Unauthorized')
      end

      context 'when url is invalid' do
        let(:url) { 'InvalidUrl' }

        let(:result) do
          {
            error: 'url is invalid'
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('400 Bad Request')
      end

      context 'when score is invalid' do
        let(:score) { -1 }

        let(:result) do
          {
            error: 'score is invalid'
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('400 Bad Request')
      end

      context 'success when score is string' do
        let(:score) { '100' }

        let(:result) do
          {
            page_id: Fixnum,
            url: Page.normalize_url(url).to_s,
            paint_id: Fixnum
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('201 Created')
      end

      context 'success' do
        let(:result) do
          {
            page_id: Fixnum,
            url: Page.normalize_url(url).to_s,
            paint_id: Fixnum
          }
        end

        before do
          post path, JSON.dump(parameters), rack_env
        end
        it_behaves_like('201 Created')
      end
    end
  end
end
