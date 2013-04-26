# Rake file to help with Vistazo development


#####################################################################
# Server
#####################################################################

desc "Start the server using the development Procfile."
task "server" do
  start_server_cmd = "foreman start -f Procfile_development"
  sh start_server_cmd
end

# Deployment
import "lib/tasks/shipit.rake"

# RSpec
import "lib/tasks/rspec.rake"

# Heroku helpers
import "lib/tasks/http_password.rake"