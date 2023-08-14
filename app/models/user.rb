class User < ApplicationRecord
  has_secure_password

  validates :email, :session_token, :first_name, :last_name, :phone_number, presence: true
  validates :email, :session_token, :phone_number, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { in: 3..255 }
  validates :password, length: { in: 6..255 }, allow_nil: true

  has_many :reservations

  has_many :reviews,
    through: :reservations

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private
  
  def generate_unique_session_token
   token = SecureRandom::urlsafe_base64
   while User.exists?(session_token: token)
    token = SecureRandom::urlsafe_base64
   end
   token
  end
  
  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
