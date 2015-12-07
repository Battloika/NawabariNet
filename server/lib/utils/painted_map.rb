class Utils::PaintedMap

  attr_reader :value

  ARRAY_SIZE = 10

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
      value.first.first.instance_of?(Fixnum) &&
      check_size_of_two_dim_array?(value) &&
      check_only0or1_in_array?(value)
      fail 'Invalid painted_map'
    end
    new(value)
  end

  private

  def self.check_size_of_two_dim_array?(array)
    (array.size == ARRAY_SIZE) &&
    (array.select { |a| a.size == ARRAY_SIZE }.size == ARRAY_SIZE)
  end

  def self.check_only0or1_in_array?(array)
    array.flatten.select do |a|
      (a == 0) || (a == 1)
    end.size == (ARRAY_SIZE * ARRAY_SIZE)
  end
end
