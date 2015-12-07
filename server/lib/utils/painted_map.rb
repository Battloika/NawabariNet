class Utils::PaintedMap
  attr_reader :value
  def initialize(painted_map)
    @value = painted_map
  end

  def self.parse(value)
    if value.instance_of?(Hashie::Mash)
      value = value.to_a.map { |v| v[1].map(&:to_i) }
    elsif value.instance_of?(String) && value.gsub(/\s/, '').include?('],[')
      value = value.gsub(/\s/, '')[2..-3].split('],[').map do |row|
        row.split(',')
      end.map { |row| row.map(&:to_i) }
    end
    unless value.instance_of?(Array) &&
      value.first.instance_of?(Array) &&
      value.first.first.instance_of?(Fixnum)
      fail 'Invalid painted_map'
    end
    new(value)
  end
end
