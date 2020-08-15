class ActivitiesController < ApplicationController
  def index

    @activities = [
      Activity.new(time: Time.parse('08:00'), symbol: '⏰'),
      Activity.new(time: Time.parse('08:15'), symbol: '🥐'),
      Activity.new(time: Time.parse('08:45'), symbol: '🦷'),
      Activity.new(time: Time.parse('09:00'), symbol: '🇫🇷'),
      Activity.new(time: Time.parse('09:15'), symbol: '️🚶'),
      Activity.new(time: Time.parse('10:00'), symbol: '️☕'),
      Activity.new(time: Time.parse('10:30'), symbol: '️🧩'),
      Activity.new(time: Time.parse('11:45'), symbol: '️📺'),
      Activity.new(time: Time.parse('12:15'), symbol: '️🍽️'),
      Activity.new(time: Time.parse('13:15'), symbol: '️️️📖️'),
      Activity.new(time: Time.parse('13:30'), symbol: '️️️️🛏️'),
      Activity.new(time: Time.parse('15:00'), symbol: '️️️📖️'),
      Activity.new(time: Time.parse('15:15'), symbol: '️️️🧩️'),
      Activity.new(time: Time.parse('16:30'), symbol: '️🚶'),
      Activity.new(time: Time.parse('17:00'), symbol: '️️️🧩️'),
      Activity.new(time: Time.parse('18:00'), symbol: '️️️📺'),
      Activity.new(time: Time.parse('18:30'), symbol: '️🍽️'),
      Activity.new(time: Time.parse('19:15'), symbol: '️️️🛀'),
      Activity.new(time: Time.parse('19:45'), symbol: '🦷'),
      Activity.new(time: Time.parse('20:00'), symbol: '🛏️')
    ]

    respond_to do |format|
      format.html
      format.json { render json: @activities.to_json }
    end
  end
end
