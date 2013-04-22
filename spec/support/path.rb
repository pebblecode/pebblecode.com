# Helper methods to navigate to paths in the application

def paths
  {
    :homepage => '/',
    :people => '/people',
    :work => '/work',
    :labs => '/labs',
    :"find-us" => '/find-us'
  }
end

def person_path(person_name)
  "#{paths[:people]}/#{person_name.to_slug}"
end
