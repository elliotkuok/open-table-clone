class User < ApplicationRecord
  has_secure_password

  validates :email, :session_token, :first_name, :last_name, :phone_number, presence: true
  validates :email, :session_token, :phone_number, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { in: 3..255 }
  validates :password, length: { in: 6..255 }, allow_nil: true

  has_many :reservations

  has_many :reviews,
    through: :reservations
end
