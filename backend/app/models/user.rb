class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  validates :name, presence: true
  validates :description, length: { maximum: 500 }

  def as_json(options = {})
    super(options).tap do |json|
      if json['image'] && json['image']['url']
        json['image']['url'] = image.url
      end
    end
  end
end