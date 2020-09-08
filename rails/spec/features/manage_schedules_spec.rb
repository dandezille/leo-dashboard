require 'rails_helper'

RSpec.feature "ManageSchedules", type: :feature do

  scenario 'User creates an schedule' do
    visit '/schedules'
    click_on 'Add schedule'

    attributes = attributes_for(:schedule)
    fill_in 'schedule[name]', with: attributes[:name]
    click_on 'Add'

    expect(page).to have_schedule(attributes)
  end

  def have_schedule(params)
    have_text(params[:name])
  end
end
