require 'sinatra'
require 'haml'
require 'sinatra/contrib'
require "sinatra/reloader" if development?

get '/' do
  erb :index
end

get '/svg/?' do
  erb :svg, :layout => :layout_svg
end

not_found do
  'This is nowhere to be found.<p><a href="/">Back to the future!</a></p>'
end