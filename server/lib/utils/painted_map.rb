class Utils::PaintedMap
  attr_reader :value
  def initialize(painted_map)
    @value = painted_map
  end

  def self.parse(value)
    if value.instance_of?(String) && value.include?('[')
      value = value[2..-3].split('],[').map { |row| row.split(',') }.map { |row| row.map(&:to_i) }
    end
    unless value.instance_of?(Array) &&
      value.first.instance_of?(Array) &&
      value.first.first.instance_of?(Fixnum)
      fail 'Invalid painted_map'
    end
    new(value)
  end
end
