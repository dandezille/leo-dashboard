class Activity < ApplicationRecord
  def as_json(options = {})
    {
      time: time.strftime('%H:%M'),
      symbol: symbol
    }
  end
end
