module OAuthService
  class GetOAuthUser
    def self.call(auth)
      # 認証データに対応するSocialProfileが存在するか確認し、なければSocialProfileを新規作成
      # 認証データをSocialProfileオブジェクトにセットし、データベースに保存
      profile = SocialProfile.find_for_oauth(auth)
      # ユーザーを探す
      # 第１候補：ログイン中のユーザー、第２候補：SocialProfileオブジェクトに紐付けされているユーザー
      user = current_or_profile_user(profile)
      unless user
        # 見つからなければ、ユーザーを新規作成
        user ||= find_or_create_new_user(auth)
      end
      # ユーザーとSocialProfileオブジェクトを関連づける
      associate_user_with_profile!(user, profile)
      user
    end

    class << self
      def current_or_profile_user(profile)
        User.current_user.presence || profile.user
      end

      def find_or_create_new_user(auth)
        temp_email = "temp@#{auth.uid}-#{auth.provider}.com"
        user = User.new(
          username: auth.extra.raw_info.name,
          email:    temp_email,
          password: Devise.friendly_token[8, 20]
        )
        user.save
        user
      end

      def associate_user_with_profile!(user, profile)
        profile.update!(user_id: user.id) if profile.user != user
      end
    end
  end
end
