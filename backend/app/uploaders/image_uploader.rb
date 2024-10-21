class ImageUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    return "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}" if model.id.present?
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/temp"
  end

  def extension_allowlist
    %w(jpg jpeg gif png)
  end

end