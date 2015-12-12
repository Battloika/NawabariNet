class Utils::Url
  attr_reader :value

  def initialize(url)
    @value = url
  end

  def self.parse(value)
    unless value.instance_of?(String) &&
           check_start_http_or_https?(value)
      fail 'Invalid url'
    end
    new(value)
  end

  def self.check_start_http_or_https?(url)
    url =~ %r{^https?://.+$}
  end
end
