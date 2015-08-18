require 'sinatra'
require 'erb'
require 'sinatra/contrib'
require 'sass'



get '/' do
  erb :index
end

get '/css/styles.css' do
  scss :styles
end

not_found do
  'This is nowhere to be found.<p><a href="/">Back to the future!</a></p>'
end