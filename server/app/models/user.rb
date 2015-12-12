class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :omniauthable

  has_many :social_profiles, dependent: :destroy

  def social_profile(provider)
    social_profiles.find { |sp| sp.provider == provider.to_s }
  end

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def password_required?
    false
  end

  class << self
    def current_user=(user)
      Thread.current[:current_user] = user
    end

    def current_user
      Thread.current[:current_user]
    end
  end
end
