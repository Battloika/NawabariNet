class Utils::Score

  attr_reader :value

  def initialize(score)
    @value = score
  end

  def self.parse(value)
    if value.instance_of?(String) && check_fixnum_string?(value)
      value = value.to_i
    end

    unless value.instance_of?(Fixnum) &&
      value >= 0
      fail 'Invalid score'
    end
    new(value)
  end

  private

  def self.check_fixnum_string?(value)
    value =~ /\A\d+\z/
  end
end
