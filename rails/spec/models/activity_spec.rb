require 'rails_helper'

RSpec.describe Activity, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:schedule) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:time) }
    it { is_expected.to validate_presence_of(:symbol) }
  end

  describe 'ordering' do
    it 'should be ordered by time' do
      a = create(:activity, time: '08:00')
      b = create(:activity, time: '08:20')
      c = create(:activity, time: '08:10')

      expect(Activity.all).to eq([a, c, b])
    end
  end
end
