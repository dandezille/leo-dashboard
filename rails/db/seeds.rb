# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Schedule.find_by(name: 'default')
  puts "default schedule already exists"
else
  puts "creating default schedule"
  Schedule.create!(name: 'default')
end

