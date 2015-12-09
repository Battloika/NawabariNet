module ApiHelper
  include Rack::Test::Methods

  shared_examples 'match json expression' do
    it 'return match json expression' do
      expect(last_response.body).to match_json_expression(result)
    end
  end

  shared_examples '200 Success' do
    it 'returns status 200' do
      expect(last_response.status).to eq 200
    end
    it_behaves_like 'match json expression'
  end

  shared_examples '201 Created' do
    it 'returns status 201' do
      expect(last_response.status).to eq 201
    end
    it_behaves_like 'match json expression'
  end

  shared_examples '400 Bad Request' do
    it 'returns status 400' do
      expect(last_response.status).to eq 400
    end
    it_behaves_like 'match json expression'
  end

  shared_examples '401 Unauthorized' do
    it 'returns status 401' do
      expect(last_response.status).to eq 401
    end
    it_behaves_like 'match json expression'
  end

  shared_examples '404 Not Found' do
    it 'returns status 404' do
      expect(last_response.status).to eq 404
    end
    it_behaves_like 'match json expression'
  end
end
