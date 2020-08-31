require 'rails_helper'

RSpec.describe Schedule, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:activities).dependent(:destroy) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe 'ordering' do
    it 'should be ordered by name' do
      create(:schedule, name: 'b')
      create(:schedule, name: 'a')
      create(:schedule, name: 'c')

      expect(Schedule.all.map(&:name)).to eq(['a', 'b', 'c'])
    end
  end
end
