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
      b = create(:schedule, name: 'b')
      a = create(:schedule, name: 'a')
      c = create(:schedule, name: 'c')

      expect(Schedule.all).to eq([a, c, b])
    end
  end
end
