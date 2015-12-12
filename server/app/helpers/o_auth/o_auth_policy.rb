module OAuthPolicy
  class Base
    attr_reader :provider, :uid, :name, :nickname, :email, :url, :image_url,
                :description, :other, :credentials, :raw_info
  end

  class Twitter < OAuthPolicy::Base
    def initialize(auth)
      @provider    = auth['provider']
      @uid         = auth['uid']
      @name        = auth['info']['name']
      @nickname    = auth['info']['nickname']
      @url         = auth['info']['urls']['Twitter']
      @image_url   = auth['info']['image']
      @description = auth['info']['description'].try(:truncate, 255)
      @credentials = auth['credentials'].to_json
      @raw_info    = auth['extra']['raw_info'].to_json
      freeze
    end
  end
end