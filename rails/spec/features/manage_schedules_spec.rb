require 'rails_helper'

RSpec.feature "ManageSchedules", type: :feature do

  scenario 'User creates a schedule' do
    visit '/schedules'
    click_on 'Add schedule'

    attributes = attributes_for(:schedule)
    fill_in 'schedule[name]', with: attributes[:name]
    click_on 'Add'

    expect(page).to have_schedule(attributes)
  end

  scenario 'User edits a schedule' do
    schedule = create(:schedule)
    visit '/schedules'

    within "[data-schedule-id='#{schedule.id}']" do
      click_on '✏️'
    end

    expect(page).to have_selector("input[value='#{schedule.name}']")

    attributes = attributes_for(:schedule)
    fill_in 'schedule[name]', with: attributes[:name]
    click_on 'Change'

    expect(page).to have_schedule(attributes)
  end

  scenario 'User deletes a schedule' do
    schedule = create(:schedule)
    visit '/schedules'

    within "[data-schedule-id='#{schedule.id}']" do
      click_on '🗑️'
    end

    expect(page).not_to have_text(schedule.name)
  end

  def have_schedule(params)
    have_text(params[:name])
  end
end
