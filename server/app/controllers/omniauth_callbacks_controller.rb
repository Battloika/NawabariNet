class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def callback_for_all_providers
    unless env["omniauth.auth"].present?
      flash[:danger] = "Authentication data was not provided"
      redirect_to root_url and return
    end
    provider = __callee__.to_s
    user = OAuthService::GetOAuthUser.call(env["omniauth.auth"])
    # ユーザーがデータベースに保存されていれば、ログイン
    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: provider.capitalize) if is_navigational_format?
    else
      user.reset_confirmation!
      redirect_to finish_signup_path(user)
    end
  end
  alias_method :twitter, :callback_for_all_providers
end
