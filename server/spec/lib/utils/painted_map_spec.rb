require 'rails_helper'

describe Utils::PaintedMap do
  let (:painted_map) { Utils::PaintedMap }

  describe '#check_size_of_two_dim_array?' do
    context 'when one dim array' do
      let (:one_dim_array) { Array.new(10).map { rand(2) } }
      it 'returns false' do
        expect(painted_map.check_size_of_two_dim_array?(one_dim_array)).to be_falsey
      end
    end
    context 'when non-square matrix' do
      let (:non_square_matrix) { Array.new(10).map { Array.new(9).map { rand(2) } } }
      it 'returns false' do
        expect(painted_map.check_size_of_two_dim_array?(non_square_matrix)).to be_falsey
      end
    end
    context 'when square matrix of different size' do
      let (:square_matrix_dif_size) { Array.new(9).map { Array.new(9).map { rand(2) } } }
      it 'returns false' do
        expect(painted_map.check_size_of_two_dim_array?(square_matrix_dif_size)).to be_falsey
      end
    end
    context 'when square matrix' do
      let (:square_matrix) { Array.new(10).map { Array.new(10).map { rand(2) } } }
      it 'returns true' do
        expect(painted_map.check_size_of_two_dim_array?(square_matrix)).to be_truthy
      end
    end
  end

  describe '#check_only0or1_in_array?' do
    context 'when include except 0 or 1' do
      let (:include_except_0or1) { Array.new(10).map { Array.new(10).map { rand(3) } }}
      it 'returns false' do
        expect(painted_map.check_only0or1_in_array?(include_except_0or1)).to be_falsey
      end
    end
    context 'when only 0 or 1' do
      let (:only_0or1) { Array.new(10).map { Array.new(10).map { rand(2) } } }
      it 'returns true' do
        expect(painted_map.check_only0or1_in_array?(only_0or1)).to be_truthy
      end
    end
  end

  describe '#parse' do
    context 'with Hashie::Mash' do
      let (:hashie_mash) do
        h = Hash.new
        (0..9).to_a.each { |key| h[key.to_s] = (Array.new(10).map { rand(2).to_s } ) }
        Hashie::Mash.new(h)
      end
      it 'returns instance of Utils::PaintedMap' do
        expect(painted_map.parse(hashie_mash)).to be_instance_of(Utils::PaintedMap)
      end
    end
    context 'with String include spaces' do
      let (:string_include_spaces) { Array.new(10).map { Array.new(10).map { rand(2) } }.to_s }
      it 'returns instance of Utils::PaintedMap' do
        expect(painted_map.parse(string_include_spaces)).to be_instance_of(Utils::PaintedMap)
      end
    end
    context 'with Array' do
      let (:array) { Array.new(10).map { Array.new(10).map { rand(2) } } }
      it 'returns instance of Utils::PaintedMap' do
        expect(painted_map.parse(array)).to be_instance_of(Utils::PaintedMap)
      end
    end
  end
end
