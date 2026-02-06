from src.exceptions import NBAApiException

def error_handler(func):
    def inner_func(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except NBAApiException:
            raise NBAApiException(f'{func.__name__}({", ".join(args)}) error')
    return inner_func