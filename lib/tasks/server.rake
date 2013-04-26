# Rake task to run the server

desc "Start the server using the development Procfile."
task "server" do
  start_server_cmd = "foreman start -f Procfile_development"
  sh start_server_cmd
end