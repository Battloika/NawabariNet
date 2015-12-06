class Utils::PaintedMap
  attr_reader :value
  def initialize(painted_map)
    @value = painted_map
  end

  def self.parse(value)
    unless value.instance_of?(Array) &&
      value.first.instance_of?(Array) &&
      value.first.first.instance_of?(Fixnum)
      fail 'Invalid painted_map'
    end
    new(value)
  end
end
