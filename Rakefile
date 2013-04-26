# Rake file to help with development

Dir.glob('lib/tasks/*.rake').each { |r| import r }

#####################################################################
# Server
#####################################################################

desc "Start the server using the development Procfile."
task "server" do
  start_server_cmd = "foreman start -f Procfile_development"
  sh start_server_cmd
end