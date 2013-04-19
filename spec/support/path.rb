# Helper methods to navigate to paths in the application
module PathSpecHelper
  def paths
    {
      :homepage => '/',
      :people => '/people',
      :work => '/work',
      :labs => '/labs',
      :"find-us" => '/find-us'
    }
  end
end