FactoryGirl.define do
  factory :page do
    url 'http://hoge.com/'
    title 'hogetitle'
    painted_map { Array.new(10).map { Array.new(10).map { rand(2) } } }
    paints { build_list(:paint, 3) }
  end
end
