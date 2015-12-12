class SocialProfilesController < ApplicationController
  before_action :authenticate_user!, only: :destroy
  before_action :correct_user!, except: :new

  def new
  end

  def destroy
    @profile.destroy
    sign_out(current_user)
    flash[:success] = "Disconnected from #{@profile.provider.capitalize}"
    redirect_to root_url
  end

  private

  def correct_user!
    @profile = SocialProfile.find(params[:id])
    redirect_to root_url and return unless @profile.user_id == current_user.id
  end
end
