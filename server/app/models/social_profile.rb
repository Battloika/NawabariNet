class SocialProfile < ActiveRecord::Base
  belongs_to :user
  store :other
  validates :uid, uniqueness: { scope: :provider }

  def self.find_for_oauth(auth)
    profile = find_or_create_by(uid: auth.uid, provider: auth.provider)
    profile.save_oauth_data!(auth)
    profile
  end

  def save_oauth_data!(auth)
    return unless valid_oauth?(auth)

    provider = auth['provider']
    policy   = policy(provider, auth)

    update_attributes(
      uid:         policy.uid,
      name:        policy.name,
      nickname:    policy.nickname,
      url:         policy.url,
      image_url:   policy.image_url,
      description: policy.description,
      credentials: policy.credentials,
      raw_info:    policy.raw_info
    )
  end

  private

  def policy(provider, auth)
    class_name = "#{provider}".classify
    OAuthPolicy::Twitter.new(auth) if class_name == 'Twitter'
  end

  def valid_oauth?(auth)
    (provider.to_s == auth['provider'].to_s) && (uid == auth['uid'])
  end
end