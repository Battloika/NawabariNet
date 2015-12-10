FactoryGirl.define do
  factory :page do
    url 'http://hoge.com/'
    title 'hogetitle'
    paints { build_list(:paint, 3) }
  end
end
