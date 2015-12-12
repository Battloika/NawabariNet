class UsersController < ApplicationController
  before_action :set_user, only: :finish_signup
  before_action :authenticate_user!, except: :finish_signup

  # OAuth認証による新規登録の締め
  # GET   /users/:id/finish_signup - 必要データの入力を求める
  # PATCH /users/:id/finish_signup - ユーザーデータを更新
  def finish_signup
    if request.patch? && @user.update(user_params)
      redirect_to root_url
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username)
  end
end
