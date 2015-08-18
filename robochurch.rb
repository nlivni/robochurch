require 'sinatra'
require 'haml'
require 'sinatra/contrib'

get '/' do
  erb :index
end

not_found do
  'This is nowhere to be found.<p><a href="/">Back to the future!</a></p>'
end