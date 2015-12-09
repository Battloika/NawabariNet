FactoryGirl.define do
  factory :domain do
    domain 'hoge.com'
    pages { build_list(:page, 1) }
  end
end
