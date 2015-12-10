FactoryGirl.define do
  factory :paint do
    score { rand(100).to_f }
  end
end
