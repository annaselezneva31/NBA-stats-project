class NBAException(Exception):
    pass


class NBAApiException(NBAException):
    pass

class NBAGameException(NBAException):
    pass
class NBAPlayerException(NBAException):
    pass