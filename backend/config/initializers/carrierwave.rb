CarrierWave.configure do |config|
  if ENV["RENDER"] == "true"
    config.asset_host = ENV["ASSET_HOST"]
  else
    config.asset_host = ENV["LOCAL_HOST"]
  end

  config.storage = :file
  config.root = Rails.root.join("public")
  config.cache_storage = :file
end