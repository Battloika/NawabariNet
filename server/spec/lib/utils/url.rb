require 'rails_helper'

describe Utils::Url do
  let(:url) { Utils::Url }

  describe '#check_start_http_or_https?' do
    context 'when not url' do
      let(:not_url) { 'NotUrl' }
      it 'returns false' do
        expect(url.check_start_http_or_https?(not_url)).to be_falsey
      end
    end
    context 'when start http' do
      let(:start_http) { 'http://hoge.com' }
      it 'returns true' do
        expect(url.check_start_http_or_https?(start_http)).to be_truthy
      end
    end
    context 'when start https' do
      let(:start_https) { 'https://hoge.com' }
      it 'returns true' do
        expect(url.check_start_http_or_https?(start_https)).to be_truthy
      end
    end
  end
end
