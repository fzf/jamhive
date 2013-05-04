Rails.application.config.generators do |g|
  g.assets      false
  g.helper      false
  g.stylesheets false

  g.test_framework :rspec, controller_specs: false,
                           fixture:          false,
                           helper_specs:     false,
                           routing_specs:    false,
                           views:            false,
                           view_specs:       false
end
