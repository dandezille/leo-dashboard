require 'rails_helper'

RSpec.feature "ManageActivities", type: :feature do
  scenario 'User creates an activity' do
    visit '/activities'
    click_on 'Add activity'

    attributes = attributes_for(:activity)
    fill_in 'activity[time]', with: attributes[:time]
    fill_in 'activity[symbol]', with: attributes[:symbol]
    fill_in 'activity[note]', with: attributes[:note]
    click_on 'Add'

    expect(page).to have_text(attributes[:time].strftime("%H:%M"))
    expect(page).to have_text(attributes[:symbol])
    expect(page).to have_text(attributes[:note])
  end

  scenario 'User edits an activity' do

  end

  scenario 'User deletes an activity' do

  end
end
