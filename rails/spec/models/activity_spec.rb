require 'rails_helper'

RSpec.describe Activity, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:time) }
    it { is_expected.to validate_presence_of(:symbol) }
  end
end
