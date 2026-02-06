class NBAException(Exception):
    """Base class for all NBA API exceptions"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class NBAApiException(NBAException):
    pass

class NBALoginException(NBAException):
    """Raised for login/register errors"""
    pass